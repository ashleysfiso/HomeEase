using HomeEase.Dtos.AccountDtos;
using HomeEase.Interfaces;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using HomeEase.Models;
using Microsoft.EntityFrameworkCore;
using HomeEase.Data;
using HomeEase.Dtos.ServiceProviderDtos;
using System.Data;

namespace HomeEase.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly ApplicationDbContext _context;

        public AuthController(UserManager<AppUser> userManager, ITokenService tokenService, ApplicationDbContext context)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _context = context;
        }

        [HttpPost("register/customer")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid data");
            }
            if (_userManager.Users.Any(u => u.Email == dto.Email))
            {
                return BadRequest("Email Already Exist");
            }

            var user = new AppUser
            {
                UserName = dto.Email,
                FirstName = dto.FirsName,
                LastName = dto.LastName,
                PhoneNumber = dto.PhoneNumber,
                Email = dto.Email,
            };
            var result = await _userManager.CreateAsync(user, dto.Password);

            if (result.Succeeded)
            {
                using var transaction = await _context.Database.BeginTransactionAsync();

                try
                {
                    var roleResults = await _userManager.AddToRoleAsync(user, "Customer");

                    if (roleResults.Succeeded)
                    {

                        var createdUser = await _userManager.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
                        if (createdUser != null)
                        {
                            var customer = new Customer { UserId = createdUser.Id };
                            await _context.Customers.AddAsync(customer);
                            await _context.SaveChangesAsync();
                            await transaction.CommitAsync();
                            return Ok("User registered");
                        }
                        await transaction.RollbackAsync();
                        await _userManager.DeleteAsync(user);
                        return StatusCode(500, "Something went wrong");
                    }
                    else
                    {
                        await _userManager.DeleteAsync(user);
                        var errorMessages = string.Join(" | ", roleResults.Errors.Select(e => e.Description));
                        return StatusCode(500, errorMessages);
                    }
                } catch(Exception ex)
                {
                    await transaction.RollbackAsync();
                    await _userManager.DeleteAsync(user);
                    return StatusCode(500, $"Transaction failed, {ex.Message}");
                }
            }
            else
            {
                var errorMessages = string.Join(" | ", result.Errors.Select(e => e.Description));
                return StatusCode(500, errorMessages);
            }  
        }

        [HttpPost("register/provider")]
        public async Task<IActionResult> RegisterProvider(NewServiceProviderDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid data");
            }
            if (_userManager.Users.Any(u => u.Email == dto.Email))
            {
                return BadRequest("Email Already Exist");
            }

            var user = new AppUser
            {
                UserName = dto.Email,
                FirstName = dto.FirsName,
                LastName = dto.LastName,
                PhoneNumber = dto.PhoneNumber,
                Email = dto.Email,
            };
            var result = await _userManager.CreateAsync(user, dto.Password);

            if (result.Succeeded)
            {
                using var transaction = await _context.Database.BeginTransactionAsync();

                try
                {
                    var roleResults = await _userManager.AddToRoleAsync(user, "ServiceProvider");

                    if (roleResults.Succeeded)
                    {

                        var createdUser = await _userManager.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
                        if (createdUser != null)
                        {
                            var serviceProvider = new Models.ServiceProvider { UserId = createdUser.Id, CompanyName = dto.CompanyName };
                            await _context.ServiceProviders.AddAsync(serviceProvider);
                            await _context.SaveChangesAsync();
                            await transaction.CommitAsync();
                            return Ok("User registered");
                        }
                        await transaction.RollbackAsync();
                        await _userManager.DeleteAsync(user);
                        return StatusCode(500, "Something went wrong");
                    }
                    else
                    {
                        await _userManager.DeleteAsync(user);
                        var errorMessages = string.Join(" | ", roleResults.Errors.Select(e => e.Description));
                        return StatusCode(500, errorMessages);
                    }
                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();
                    await _userManager.DeleteAsync(user);
                    return StatusCode(500, $"Transaction failed, {ex.Message}");
                }
            }
            else
            {
                var errorMessages = string.Join(" | ", result.Errors.Select(e => e.Description));
                return StatusCode(500, errorMessages);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var user = await _userManager.Users.Include(u => u.Customer).Include(u => u.ServiceProvider).FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, dto.Password))
                return Unauthorized("Incorrect username or password");

            var accessToken = await _tokenService.CreateAccessToken(user);
            var refreshToken = _tokenService.CreateRefreshToken();

            user.SetRefreshToken(refreshToken, DateTime.UtcNow.AddDays(7));
            await _userManager.UpdateAsync(user);

            Response.Cookies.Append("access_token", accessToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddMinutes(15)
            });

            Response.Cookies.Append("refreshToken", refreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(7)
            });
            var role = await _userManager.GetRolesAsync(user);
            return Ok(
                new UserDto
                {
                    Email = user.Email,
                    UserName = $"{user.FirstName} {user.LastName}",
                    UserId = user.Id,
                    Role = role,
                    CustomerID = user.Customer?.Id,
                    ProviderId = user.ServiceProvider?.Id,
                });
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if (string.IsNullOrEmpty(refreshToken))
                return Unauthorized(new { message = "Missing refresh token" });

            var user = await _userManager.Users.FirstOrDefaultAsync((u => u.RefreshToken == refreshToken));

            if (user == null || user.RefreshTokenExpiryTime < DateTime.UtcNow)
                return Unauthorized();


            var newAccessToken = await _tokenService.CreateAccessToken(user);
            var newRefreshToken = _tokenService.CreateRefreshToken();

            user.SetRefreshToken(newRefreshToken, DateTime.UtcNow.AddDays(7));
            await _userManager.UpdateAsync(user);

            Response.Cookies.Append("access_token", newAccessToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddMinutes(15)
            });

            Response.Cookies.Append("refreshToken", newRefreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(7)
            });

            return Ok("You are authorized!");
        }

        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userManager.FindByIdAsync(userId);

            user.RefreshToken = null;
            user.RefreshTokenExpiryTime = DateTime.MinValue;

            await _userManager.UpdateAsync(user);

            Response.Cookies.Delete("access_token");
            Response.Cookies.Delete("refreshToken");

            return Ok("Logged out");
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> Me()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userManager.Users.Include(u => u.Customer).Include(u => u.ServiceProvider).FirstOrDefaultAsync(u => u.Id == userId);
            var role = await _userManager.GetRolesAsync(user);
            return Ok(
                new UserDto
                {
                    Email = user.Email,
                    UserName = $"{user.FirstName} {user.LastName}",
                    UserId = user.Id,
                    Role = role,
                    CustomerID = user.Customer?.Id,
                    ProviderId = user.ServiceProvider?.Id,
                });
        }
    }
}

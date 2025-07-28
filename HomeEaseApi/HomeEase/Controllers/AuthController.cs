namespace HomeEase.Controllers
{
    using System.Data;
    using System.Security.Claims;
    using HomeEase.Data;
    using HomeEase.Dtos.AccountDtos;
    using HomeEase.Interfaces;
    using HomeEase.Models;
    using HomeEase.Repository;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Rewrite;
    using Microsoft.EntityFrameworkCore;

    /// <summary>
    /// Defines the <see cref="AuthController" />
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly ApplicationDbContext _context;
        private readonly AuditQueue _auditQueue;

        public AuthController(UserManager<AppUser> userManager, ITokenService tokenService, ApplicationDbContext context, AuditQueue auditQueue)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _context = context;
            _auditQueue = auditQueue;
        }

        /// <summary>
        /// The Register
        /// </summary>
        /// <param name="dto">The dto<see cref="RegisterDto"/></param>
        /// <returns>The <see cref="Task{IActionResult}"/></returns>
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
                FirstName = dto.FirstName,
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
                            _auditQueue.Enqueue(new AuditLog
                            {
                                Action = "Register Customer",
                                PerformedBy = createdUser.Id,
                                TableName = "Users",
                                RecordId = createdUser.Id,
                                Details = "Register successful"
                            });
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

        /// <summary>
        /// The RegisterProvider
        /// </summary>
        /// <param name="dto">The dto<see cref="NewServiceProviderDto"/></param>
        /// <returns>The <see cref="Task{IActionResult}"/></returns>

        [Authorize(Roles = "Admin")]
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
                FirstName = dto.FirstName,
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
                            _auditQueue.Enqueue(new AuditLog
                            {
                                Action = "Register service provider",
                                PerformedBy = createdUser.Id,
                                TableName = "Users",
                                RecordId = createdUser.Id,
                                Details = "Register successful"
                            });
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
        [Authorize(Roles = "Admin")]
        [HttpPost("register/admin")]
        public async Task<IActionResult> RegisterAdmin(NewServiceProviderDto dto)
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
                FirstName = dto.FirstName,
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
                    var roleResults = await _userManager.AddToRoleAsync(user, "Admin");

                    if (roleResults.Succeeded)
                    {
                        await transaction.CommitAsync();
                        _auditQueue.Enqueue(new AuditLog
                        {
                            Action = "Register admin",
                            PerformedBy = user.Id,
                            TableName = "Users",
                            RecordId = user.Id,
                            Details = "Register successful"
                        });
                        return Ok("User registered");
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

        /// <summary>
        /// The Login
        /// </summary>
        /// <param name="dto">The dto<see cref="LoginDto"/></param>
        /// <returns>The <see cref="Task{IActionResult}"/></returns>
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

            var updatedUser = await _userManager.FindByIdAsync(user.Id);
           

            Response.Cookies.Delete("refreshToken");
            Response.Cookies.Delete("access_token");

            Response.Cookies.Append("access_token", accessToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Lax,
                Expires = DateTime.UtcNow.AddMinutes(2),
                Path = "/"
            });

            Response.Cookies.Append("refreshToken", updatedUser.RefreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Lax,
                Expires = DateTime.UtcNow.AddDays(7),
                Path = "/"
            });

            var role = await _userManager.GetRolesAsync(user);
            _auditQueue.Enqueue(new AuditLog
            {
                Action = "User Loggin",
                PerformedBy = user.Id,
                TableName = "Users",
                RecordId = user.Id,
                Details = "Login successful"
            });

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

        /// <summary>
        /// The Refresh
        /// </summary>
        /// <returns>The <see cref="Task{IActionResult}"/></returns>
        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            Console.WriteLine("Received Refresh Token: " + refreshToken);

            if (string.IsNullOrEmpty(refreshToken))
                return Unauthorized(new { message = "Missing refresh token" });

            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.RefreshToken == refreshToken);

            if (user == null || user.RefreshTokenExpiryTime < DateTime.UtcNow)
            {
                Console.WriteLine("No user found with this refresh token.");
                return Unauthorized();
            }

            var newAccessToken = await _tokenService.CreateAccessToken(user);
            var newRefreshToken = _tokenService.CreateRefreshToken();

            user.SetRefreshToken(newRefreshToken, DateTime.UtcNow.AddDays(7));
            await _userManager.UpdateAsync(user);

            var updatedUser = await _userManager.FindByIdAsync(user.Id);

            Response.Cookies.Delete("refreshToken");
            Response.Cookies.Delete("access_token");

            Response.Cookies.Append("access_token", newAccessToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Lax,
                Expires = DateTime.UtcNow.AddMinutes(2),
            });

            Response.Cookies.Append("refreshToken", updatedUser.RefreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Lax,
                Expires = DateTime.UtcNow.AddDays(7),
            });

            return Ok("You are authorized!");
        }

        /// <summary>
        /// The Logout
        /// </summary>
        /// <returns>The <see cref="Task{IActionResult}"/></returns>
        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userManager.FindByIdAsync(userId);

            user.RefreshToken = null;
            user.RefreshTokenExpiryTime = DateTime.MinValue;
            
            await _userManager.UpdateAsync(user);
            _auditQueue.Enqueue(new AuditLog
            {
                Action = "User logout",
                PerformedBy = user.Id,
                TableName = "Users",
                RecordId = user.Id,
                Details = "Logout successful"
            });

            Response.Cookies.Delete("access_token");
            Response.Cookies.Delete("refreshToken");

            return Ok("Logged out");
        }

        /// <summary>
        /// The Me
        /// </summary>
        /// <returns>The <see cref="Task{IActionResult}"/></returns>
        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> Me()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userManager.Users.Include(u => u.Customer).Include(u => u.ServiceProvider).FirstOrDefaultAsync(u => u.Id == userId);
            var role = await _userManager.GetRolesAsync(user);
            return Ok(
                new 
                {
                    Email = user.Email,
                    UserName = $"{user.FirstName} {user.LastName}",
                    UserId = user.Id,
                    Role = role,
                    CustomerID = user.Customer?.Id,
                    ProviderId = user.ServiceProvider?.Id,
                });
        }

        [Authorize]
        [HttpPut("edit-profile")]
        public async Task<IActionResult> EditProfile([FromBody] EditProfile editProfile)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid data submitted");
            }
            var user = await _userManager.FindByIdAsync(editProfile.userId);

            if (user == null)
                return NotFound("User not found");

            user.PhoneNumber = editProfile.PhoneNumber;
            user.FirstName = editProfile.FirstName;
            user.LastName = editProfile.LastName;

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                _auditQueue.Enqueue(new AuditLog
                {
                    Action = "User edit profile",
                    PerformedBy = user.Id,
                    TableName = "Users",
                    RecordId = user.Id,
                    Details = "Edit profile successful"
                });

                return Ok(new
                {
                    message = "User updated successfully",
                    user = new
                    {
                        user.Id,
                        user.UserName,
                        user.Email,
                        user.PhoneNumber,
                        user.FirstName,
                        user.LastName
                    }
                });
            }

            return BadRequest(result.Errors);
        }

        [Authorize]
        [HttpGet("user-profile/{userId}")]
        public async Task<IActionResult> UserProfile([FromRoute] string userId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid data submitted");
            }
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                return NotFound("User not found");

            _auditQueue.Enqueue(new AuditLog
            {
                Action = "User edit profile",
                PerformedBy = user.Id,
                TableName = "Users",
                RecordId = user.Id,
                Details = "Edit profile successful"
            });

            return Ok(new
              {
                  user.Id,
                  user.UserName,
                  user.Email,
                  user.PhoneNumber,
                  user.FirstName,
                  user.LastName
              });
        }

        [Authorize]
        [HttpPut("update-password")]
        public async Task<IActionResult> UpdatePassword([FromBody] UpdatePassword updatePassword)
        {
            var user = await _userManager.FindByIdAsync(updatePassword.userId);
            if (user == null)
                return NotFound("User not found");

            var result = await _userManager.ChangePasswordAsync(user, updatePassword.currentPassword, updatePassword.newPassword);

            if (result.Succeeded)
            {
                _auditQueue.Enqueue(new AuditLog
                {
                    Action = "Update password",
                    PerformedBy = user.Id,
                    TableName = "Users",
                    RecordId = user.Id,
                    Details = "Update password successful"
                });

                return Ok(new { message = "Password updated successfully." });
            }

            var errorMessages = string.Join(" | ", result.Errors.Select(e => e.Description));
            return StatusCode(500, errorMessages);
        }


    }
}

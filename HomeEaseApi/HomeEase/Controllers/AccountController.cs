using HomeEase.Data;
using HomeEase.Dtos;
using HomeEase.Dtos.AccountDtos;
using HomeEase.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HomeEase.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ApplicationDbContext   _context;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context;
        }
        //This endpoint allows users of the app to register without the adim
        [HttpPost("register/customers")]
        public async Task<IActionResult> RegisterCustomer([FromBody] RegisterDto registerDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest("Invalid data");
            }

            var appUser = new AppUser
            {
               
                Email = registerDto.Email,
                PhoneNumber = registerDto.PhoneNumber,

            };

            var createdUser = await _userManager.CreateAsync(appUser, registerDto.Password);

            if(createdUser.Succeeded)
            {
                var roleResults = await _userManager.AddToRoleAsync(appUser , "Customer");
                if(roleResults.Succeeded)
                {
                    //Adding user to a customer table
                    
                    var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Email == registerDto.Email);
                    if(user != null)
                    {
                        var customer = new Customer { UserId = user.Id };
                        await _context.Customers.AddAsync(customer);
                        await _context.SaveChangesAsync();
                        var role = await _userManager.GetRolesAsync(user);
                        return Ok(
                            new NewUserDto
                            {
                                UserName = appUser.UserName,
                                Email = appUser.Email,
                                UserId = user.Id,
                                Role = role

                            });
                    }
                    return StatusCode(500, user);
                }
                else
                {
                    return StatusCode(500, roleResults.Errors);
                }
            }
            else
            {
                return StatusCode(500, createdUser.Errors);
            }
        }
        //This endpoint must be available to admins to register service providers
        [HttpPost("register/service-providers")]
        public async Task<IActionResult> RegisterServicerProvider([FromBody] NewServiceProviderDto serviceProviderDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid data");
            }

            var appUser = new AppUser
            {
                UserName = serviceProviderDto.Username,
                Email = serviceProviderDto.Email,
                PhoneNumber = serviceProviderDto.PhoneNumber,

            };

            var createdUser = await _userManager.CreateAsync(appUser, serviceProviderDto.Password);

            if (createdUser.Succeeded)
            {
                var roleResults = await _userManager.AddToRoleAsync(appUser, "ServiceProvider");
                if (roleResults.Succeeded)
                {
                    //Adding user to a service-provider table
                    var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Email == serviceProviderDto.Email);
                    if (user != null)
                    {
                        var serviceProvider = new Models.ServiceProvider { UserId = user.Id, CompanyName = serviceProviderDto.CompanyName};
                        await _context.ServiceProviders.AddAsync(serviceProvider);
                        await _context.SaveChangesAsync();
                        var role = await _userManager.GetRolesAsync(user);
                        return Ok(
                            new NewUserDto
                            {
                               
                                Email = appUser.Email,
                                UserId = user.Id,
                                Role = role

                            });
                    }
                    return StatusCode(500, user);
                   
                }
                else
                {
                    return StatusCode(500, roleResults.Errors);
                }
            }
            else
            {
                return StatusCode(500, createdUser.Errors);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> LogIn([FromBody] LoginDto loginDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest("Invalid data");
            }

            var user = await _userManager.Users.Include(u => u.Customer).Include(u => u.ServiceProvider).FirstOrDefaultAsync(u => u.Email == loginDto.Email);
            if(user == null)
            {
                return Unauthorized("Invalid username");
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if(!result.Succeeded)
            {
                return Unauthorized("Incorrect username or password");
            }

            var role = await _userManager.GetRolesAsync(user);

            return Ok(
                new NewUserDto
                {
                    Email = user.Email,
                    UserName = user.UserName,
                    UserId = user.Id,
                    Role = role,
                    CustomerID = user.Customer?.Id,
                    ProviderId = user.ServiceProvider?.Id,
                });
        }
        
    }
}

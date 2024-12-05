using HomeEase.Dtos;
using HomeEase.Dtos.AccountDtos;
using HomeEase.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HomeEase.Controllers
{
    [Route("HomeEase/Account")]
    [ApiController]
    public class AccountController : Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest("Invalid data");
            }

            var appUser = new AppUser
            {
                UserName = registerDto.Username,
                Email = registerDto.Email,
                PhoneNumber = registerDto.PhoneNumber,

            };

            var createdUser = await _userManager.CreateAsync(appUser, registerDto.Password);

            if(createdUser.Succeeded)
            {
                var roleResults = await _userManager.AddToRoleAsync(appUser , "User");
                if(roleResults.Succeeded)
                {
                    return Ok(
                        new NewUserDto
                        {
                            UserName = appUser.UserName,
                            Email = appUser.Email
                        });
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

        [HttpPost]
        public async Task<IActionResult> LogIn([FromBody] LoginDto loginDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest("Invalid data");
            }

            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Email == loginDto.Email);
            if(user == null)
            {
                return Unauthorized("Invalid username");
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if(!result.Succeeded)
            {
                return Unauthorized("Incorrect username or password");
            }

            return Ok(
                new NewUserDto
                {
                    Email = user.Email,
                    UserName = user.UserName
                });
        }
        
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Biblioteca.Api.Dtos;
using Biblioteca.Api.Models;

namespace Biblioteca.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public UsersController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        // POST api/users/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var result = await _signInManager.PasswordSignInAsync(
                dto.Email, dto.Password, isPersistent: true, lockoutOnFailure: false);
            if (!result.Succeeded)
                return Unauthorized(new { message = "Credenciales inválidas." });

            return Ok();
        }

        // ✅ POST api/users/logout
        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }

        // POST api/users/register  ← Solo Admin
        [HttpPost("register")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            var user = new ApplicationUser
            {
                UserName = dto.Email,
                Email = dto.Email,
                Name = dto.Name
            };
            var createResult = await _userManager.CreateAsync(user, dto.Password);
            if (!createResult.Succeeded)
                return BadRequest(createResult.Errors);

            var roleResult = await _userManager.AddToRoleAsync(user, dto.Role);
            if (!roleResult.Succeeded)
                return BadRequest(roleResult.Errors);

            return Ok();
        }

        // GET api/users/me
        [HttpGet("me")]
        [Authorize]
        public async Task<ActionResult<UserReadDto>> Me()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return Unauthorized();

            var roles = await _userManager.GetRolesAsync(user);

            return new UserReadDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email ?? string.Empty,
                Role = roles.FirstOrDefault() ?? string.Empty,
                CreatedAt = user.CreatedAt
            };
        }

        // GET api/users    ← Solo Admin
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<UserReadDto>>> GetAll()
        {
            var users = await _userManager.Users.ToListAsync();
            var result = new List<UserReadDto>();
            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                result.Add(new UserReadDto
                {
                    Id = user.Id,
                    Name = user.Name,
                    Email = user.Email ?? string.Empty,
                    Role = roles.FirstOrDefault() ?? string.Empty,
                    CreatedAt = user.CreatedAt
                });
            }
            return Ok(result);
        }
    }
}

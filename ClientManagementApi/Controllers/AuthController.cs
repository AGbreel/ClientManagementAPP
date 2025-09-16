using Microsoft.AspNetCore.Mvc;
using ClientManagementApi.DTOs;
using ClientManagementApi.Services;

namespace ClientManagementApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly TokenService _tokenService;

        public AuthController(TokenService tokenService)
        {
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto loginDto)
        {
            if (loginDto.Username == "Admin" && loginDto.Password == "AdminPassword@123")
            {
                var token = _tokenService.GenerateToken(loginDto.Username);
                return Ok(new { token });
            }

            return Unauthorized(new { message = "Invalid credentials" });
        }
    }
}

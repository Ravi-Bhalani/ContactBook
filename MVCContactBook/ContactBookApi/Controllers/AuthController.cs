using ContactBookApi.Dtos;
using ContactBookApi.Models;
using ContactBookApi.Services.Contract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ContactBookApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService _authService)
        {
            this._authService = _authService;
        }

        [HttpPost("Register")]
        public IActionResult Register(RegisterDto registerDto)
        {

            var response = _authService.RegisterUserService(registerDto);
            return !response.Success ? BadRequest(response) : Ok(response);

        }

        [HttpPost("Login")]
        public IActionResult Login(LoginDto loginDto)
        {
            var response = _authService.LoginUserService(loginDto);
            return !response.Success ? BadRequest(response) : Ok(response);

        }

        [HttpPost("ForgetPassword")]
        public IActionResult ForgetPassword(ForgetDto forgetDto)
        {
            var response = _authService.ForgetPasswordService(forgetDto);
            return !response.Success ? BadRequest(response) : Ok(response);
        }

        [HttpGet("GetUserByLoginId/{loginId}")]

        public IActionResult GetUserByLogInId(string loginId)
        {
            var response = _authService.GetUserById(loginId);
            if (!response.Success)
            {
                return NotFound(response);
            }
            return Ok(response);
        }

        [HttpPut("ModifyUser")]
        [Authorize]

        public IActionResult UpdateContact(UpdateRegisterDto contactDto)
        {
            if (ModelState.IsValid)
            {
                var contact = new User()

                {
                    userId = contactDto.userId,
                    FirstName = contactDto.FirstName,
                    LastName = contactDto.LastName,
                    LoginId = contactDto.LoginId,
                    Email = contactDto.Email,
                    FileName = contactDto.FileName,
                    ImageByte = contactDto.ImageByte,
                    ContactNumber = contactDto.ContactNumber,


                };

                var response = _authService.ModifyUser(contact);
                return !response.Success ? BadRequest(response) : Ok(response);
            }
            else
            {
                return BadRequest();
            }

        
        }
    }
}
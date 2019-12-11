using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Security.Claims;
using Tigerspike.LandmarkRemark.Common;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> logger;
        private readonly IUserService userService;

        public UserController(ILogger<UserController> logger, IUserService userService)
        {
            this.logger = logger;
            this.userService = userService;
        }

        [AllowAnonymous]
        [HttpPost]
        public void Register(Tigerspike.LandmarkRemark.Api.Model.RegistrationInfo registerationInfo)
        {
            this.userService.RegisterUser(new RegistrationInfo(registerationInfo.Username, registerationInfo.Email, registerationInfo.Password));
        }

        [AllowAnonymous]
        [HttpPost("Login")]
        public IActionResult Login(Tigerspike.LandmarkRemark.Api.Model.LoginInfo loginInfo)
        {
            return Ok(new Tigerspike.LandmarkRemark.Api.Model.LoginResult("username1", "test@email.com",
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cG4iOiJ1c2VybmFtZTEiLCJlbWFpbCI6InRlc3RAZW1haWwuY29tIiwibmJmIjoxNTc2MDI3MDU5LCJleHAiOjE1NzY2MzE4NTksImlhdCI6MTU3NjAyNzA1OX0.YujSINMKSGiPx-4WNVBrmMMUPbFNaRhm5J62gqKfcfY"
                ));
            var loggedInUser = userService.Login(new LoginInfo(loginInfo.Login, loginInfo.Password));
            if (loggedInUser == null)
            {
                return base.Unauthorized();
            }
            return Ok(new Tigerspike.LandmarkRemark.Api.Model.LoginResult(loggedInUser.Username, loggedInUser.Email, loggedInUser.Token));
        }

        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            var username = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Upn).Value;
            return Ok(new Tigerspike.LandmarkRemark.Api.Model.RegistrationInfo
            {
                FirstName = "Mohsen",
                Email = "Test@email.com",
                Username = username
            });
        }

        [Authorize]
        [HttpPut]
        public IActionResult UpdateProfile([FromBody]Tigerspike.LandmarkRemark.Api.Model.RegistrationInfo registrationInfo)
        {
            var username = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Upn).Value;
            return Ok();
        }
    }
}
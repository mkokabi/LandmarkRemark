using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
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
            var loggedInUser = userService.Login(new LoginInfo(loginInfo.Login, loginInfo.Password));
            if (loggedInUser == null)
            {
                return base.Unauthorized();
            }
            return Ok(new Tigerspike.LandmarkRemark.Api.Model.LoginResult(loggedInUser.Username, loggedInUser.Email, loggedInUser.Token));
        }
    }
}
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using NSubstitute;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using Tigerspike.LandmarkRemark.Common;
using Tigerspike.LandmarkRemark.Common.Exceptions;
using Tigerspike.LandmarkRemark.Data;
using Tigerspike.LandmarkRemark.Data.DataModels;
using Tigerspike.LandmarkRemark.Services;
using Xunit;

[assembly: CollectionBehavior(DisableTestParallelization = true)]

namespace TestProject
{
    public class UserServiceTests
    {
        readonly UserServices userServices;
        readonly LandmarkRemarkContext landmarkRemarkContext;
        readonly ICrypto crypto;

        public UserServiceTests()
        {
            var options = new DbContextOptionsBuilder<LandmarkRemarkContext>()
                .UseInMemoryDatabase(databaseName: "Database" + Guid.NewGuid().ToString())
                .Options;
            landmarkRemarkContext = new LandmarkRemarkContext(options);
            crypto = Substitute.For<ICrypto>();
            crypto.Hash(default).ReturnsForAnyArgs(x => "Hashed" + x.Arg<string>());
            var configuration = Substitute.For<IConfiguration>();
            configuration["Secret"] = "A secret 1234567890";
            userServices = new UserServices(landmarkRemarkContext, crypto, configuration);
        }

        [Fact]
        public void RegisterUser_NewUserRecordShouldBeCreated()
        {
            var regInfo = new RegistrationInfo(username: "testusername", email: "testemail@email.com", password: "Passw0rd");
            var userInfo = userServices.RegisterUser(regInfo);
            userInfo.Should().NotBeNull();
            userInfo.Username.Should().Be(regInfo.UserName);
            userInfo.Email.Should().Be(regInfo.Email);
            userInfo.Password.Should().BeNullOrEmpty();
            landmarkRemarkContext.Users.Should().HaveCount(1);
            var dbUser = landmarkRemarkContext.Users.FirstOrDefault();
            dbUser.Email.Should().Be(regInfo.Email);
            dbUser.Username.Should().Be(regInfo.UserName);
            dbUser.Password.Should().Be(crypto.Hash(regInfo.Password));
        }

        private void CreateTestUser()
        {
            landmarkRemarkContext.Users.Add(new User { Username = "testusername", Email = "testemail@email.com", Password = crypto.Hash("Passw0rd") });
            landmarkRemarkContext.SaveChanges();
        }

        [Fact]
        public void RegisterUser_DuplicateUsernameOrEmail_ShouldThrow()
        {
            CreateTestUser();
            userServices.Invoking(us =>
                us.RegisterUser(new RegistrationInfo(username: "testusername", email: "testemail@email.com", password: "Passw0rd")))
            .Should().Throw<DuplicateUserException>();
        }

        [Fact]
        public void Login_ShouldAllowWihtUserNameOrEmail()
        {
            CreateTestUser();
            userServices.Login(new LoginInfo(login: "testusername", password: "Passw0rd")).Should().NotBeNull();
            userServices.Login(new LoginInfo(login: "testemail@email.com", password: "Passw0rd")).Should().NotBeNull();
        }

        [Fact]
        public void Login_ShouldReturnClaimsInJwtToken()
        {
            CreateTestUser();
            UserInfo userInfo = userServices.Login(new LoginInfo(login: "testusername", password: "Passw0rd"));
            userInfo.Should().NotBeNull();
            var token = userInfo.Token;
            token.Should().NotBeNullOrWhiteSpace();
            var handler = new JwtSecurityTokenHandler();
            var jwttoken = handler.ReadJwtToken(token);
            jwttoken.Should().NotBeNull();
            var upnClaim = jwttoken.Claims.FirstOrDefault(c => c.Type == "upn");
            upnClaim.Should().NotBeNull().And.Match<Claim>((c) => c.Value == "testusername");
            var emailClaim = jwttoken.Claims.FirstOrDefault(c => c.Type == "email");
            emailClaim.Should().NotBeNull().And.Match<Claim>((c) => c.Value == "testemail@email.com");
        }

        [Fact]
        public void Login_ShouldBeCaseInsenstiveForUsernameOrEmail()
        {
            CreateTestUser();
            userServices.Login(new LoginInfo(login: "Testusername", password: "Passw0rd")).Should().NotBeNull();
            userServices.Login(new LoginInfo(login: "Testemail@email.com", password: "Passw0rd")).Should().NotBeNull();
        }

        [Fact]
        public void Login_ShouldThrowExceptionOnWrongPassword()
        {
            CreateTestUser();
            userServices.Invoking(us => us.Login(new LoginInfo(login: "Testusername", password: "Passw0r")))
                .Should().Throw<LoginFailedException>();
        }

        [Fact]
        public void Login_ShouldBeCaseSenstiveForPassword()
        {
            CreateTestUser();
            userServices.Invoking(us => us.Login(new LoginInfo(login: "Testusername", password: "passw0rd")))
                .Should().Throw<LoginFailedException>();
        }
    }
}

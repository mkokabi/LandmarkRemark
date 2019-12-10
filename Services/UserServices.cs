using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Tigerspike.LandmarkRemark.Common;
using Tigerspike.LandmarkRemark.Common.Exceptions;
using Tigerspike.LandmarkRemark.Data;
using Tigerspike.LandmarkRemark.Data.DataModels;

namespace Tigerspike.LandmarkRemark.Services
{
    public class UserServices : IUserService
    {
        private readonly LandmarkRemarkContext dbContext;
        private readonly ICrypto crypto;
        private readonly IConfiguration configuration;

        public UserServices(LandmarkRemarkContext dbContext, ICrypto crypto, IConfiguration configuration)
        {
            this.dbContext = dbContext;
            this.crypto = crypto;
            this.configuration = configuration;
        }

        public UserInfo Login(LoginInfo loginInfo)
        {
            User user = null;
            var login = loginInfo.Login.ToUpper();
            user = dbContext.Users.SingleOrDefault(u => u.Username.ToUpper() == login || u.Email.ToUpper() == login);
            if (user == null)
            {
                throw new LoginFailedException();
            }
            if (crypto.Hash(loginInfo.Password) == user.Password)
            {
                return new UserInfo
                {
                    Email = user.Email,
                    Username = user.Username,
                    Firstname = user.Firstname,
                    Lastname = user.Lastname,
                    Token = GenerateToken(user)
                };
            }
            throw new LoginFailedException();
        }

        public string Secret => configuration["Secret"];


        private string GenerateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Secret);
            var claims = new List<Claim>(new[] {
                        new Claim(ClaimTypes.Upn, user.Username),
                        new Claim(ClaimTypes.Email, user.Email) });

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public UserInfo RegisterUser(RegistrationInfo registerationInfo)
        {
            var username = registerationInfo.UserName.ToUpper();
            var email = registerationInfo.Email.ToUpper();
            var duplUser = dbContext.Users.SingleOrDefault(u => u.Username.ToUpper() == username || u.Email.ToUpper() == email);
            if (duplUser != null)
            {
                throw new DuplicateUserException();
            }
            var user = new User
            { 
                Username = registerationInfo.UserName, 
                Email = registerationInfo.Email,
                Password = crypto.Hash(registerationInfo.Password)
            };
            dbContext.Users.Add(user);
            dbContext.SaveChanges();
            return new UserInfo
            {
                Username = user.Username,
                Email = user.Email
            };
        }
    }
}

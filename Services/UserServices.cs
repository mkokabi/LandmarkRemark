using System.Linq;
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

        public UserServices(LandmarkRemarkContext dbContext, ICrypto crypto)
        {
            this.dbContext = dbContext;
            this.crypto = crypto;
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
                    Lastname = user.Lastname
                };
            }
            throw new LoginFailedException();
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

namespace Tigerspike.LandmarkRemark.Common
{
    public class LoginInfo
    {
        public LoginInfo(string login, string password)
        {
            this.Login = login;
            this.Password = password;
        }

        public string Login { get; private set; }
        public string Password { get; private set; }
    }
}

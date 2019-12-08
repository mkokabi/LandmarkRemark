namespace Tigerspike.LandmarkRemark.Common
{
    public class RegisterationInfo
    {
        public RegisterationInfo(string username, string email, string password)
        {
            this.UserName = username;
            this.Email = email;
            this.Password = password;
        }
        public string UserName { get; private set; }
        public string Password { get; private set; }
        public string Email { get; private set; }
    }
}
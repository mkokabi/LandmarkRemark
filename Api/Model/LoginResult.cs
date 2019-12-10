namespace Tigerspike.LandmarkRemark.Api.Model
{
    public class LoginResult
    {
        public LoginResult(string username, string email, string token)
        {
            Username = username;
            Email = email;
            Token = token;
        }
        public string Username { get; private set; }
        public string Email { get; private set; }
        public string Token { get; private set; }
    }
}

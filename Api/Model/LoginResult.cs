namespace Tigerspike.LandmarkRemark.Api.Model
{
    public class LoginResult
    {
        public LoginResult(string username, string displayName, string token)
        {
            Username = username;
            DisplayName = displayName;
            Token = token;
        }
        public string Username { get; private set; }
        public string DisplayName { get; private set; }
        public string Token { get; private set; }
    }
}

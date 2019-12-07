namespace Tigerspike.LandmarkRemark.Common
{
    public interface IUserService
    {
        /// <summary>
        /// Register a user with minimum information
        /// </summary>
        /// <param name="registerationInfo">Registration info</param>
        /// <returns></returns>
        UserInfo RegisterUser(RegisterationInfo registerationInfo);

        /// <summary>
        /// Log a user in
        /// </summary>
        /// <param name="loginInfo">Login info</param>
        /// <returns></returns>
        UserInfo Login(LoginInfo loginInfo);
    }
}

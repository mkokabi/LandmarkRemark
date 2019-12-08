namespace Tigerspike.LandmarkRemark.Common
{
    public interface ICrypto
    {
        string Hash(string input);
        string Encrypt(string plainText);
        string Decrypt(string encrypted);
    }
}

using Tigerspike.LandmarkRemark.Common;

namespace Tigerspike.LandmarkRemark.Api.Model
{
    public class Note
    {
        public Note()
        {
        }

        public Note(string body, double x, double y, UserInfo owner)
        {
            this.Body = body;
            this.X = x;
            this.Y = y;
            this.Name = $"{owner.Firstname} {owner.Lastname}";
            if (string.IsNullOrWhiteSpace(this.Name))
            {
                this.Name = owner.Username;
            }
        }

        public string Body { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
        public string Name { get; set; }
    }
}

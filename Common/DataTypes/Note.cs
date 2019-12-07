using System.Spatial;

namespace Tigerspike.LandmarkRemark.Common
{
    public class Note
    {
        public UserInfo Owner { get; set; }
        public string Body { get; set; }
        public Geometry Location { get; set; }
    }
}

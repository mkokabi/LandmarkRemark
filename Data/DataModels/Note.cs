using NetTopologySuite.Geometries;

namespace Tigerspike.LandmarkRemark.Data.DataModels
{
    public class Note : BaseEntity
    {
        public User Owner { get; set; }
        public string Body { get; set; }
        public Geometry Location { get; set; }
    }
}
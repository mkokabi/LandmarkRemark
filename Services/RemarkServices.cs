using System;
using System.Collections.Generic;
using System.Linq;
using System.Spatial;
using Tigerspike.LandmarkRemark.Common;
using Tigerspike.LandmarkRemark.Data;

namespace Tigerspike.LandmarkRemark.Services
{
    public class RemarkServices : IRemarkService
    {
        private readonly LandmarkRemarkContext dbContext;
        public RemarkServices(LandmarkRemarkContext dbContext)
        {
            this.dbContext = dbContext;
        }


        public Note CreateNote(int userId, Geometry location, string text)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Note> GetNotesByLocation(Geometry location, int userId = 0)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Note> GetNotesByText(string text)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Note> GetNotesByUser(int userId)
        {
            return dbContext.Notes.Where(n => n.Owner.Id == userId).Select(n => new Note
            {
                Owner = new UserInfo
                {
                    Username = ""
                },
                Body = n.Body,
                Location = GeometryPoint.Create(n.Location.Coordinate.X, n.Location.Coordinate.Y)
            });
        }
    }
}

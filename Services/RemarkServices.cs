using System;
using System.Collections.Generic;
using System.Spatial;
using System.Text;
using Tigerspike.LandmarkRemark.Common;

namespace Tigerspike.LandmarkRemark.Services
{
    public class RemarkServices : IRemarkService
    {
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
            throw new NotImplementedException();
        }
    }
}

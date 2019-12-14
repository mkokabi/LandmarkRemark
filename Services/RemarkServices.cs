using NetTopologySuite;
using System.Collections.Generic;
using System.Linq;
using System.Spatial;
using Tigerspike.LandmarkRemark.Common;
using Tigerspike.LandmarkRemark.Common.Exceptions;
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

        public int CreateNote(string username, Geometry location, string text)
        {
            var user = dbContext.Users.FirstOrDefault(u => u.Username == username);
            if (user == null)
            {
                throw new UserNotFoundException($"{username} not found.");
            }
            var geometryFactory = NtsGeometryServices.Instance.CreateGeometryFactory(srid: 4326);
            var point = location as  GeometryPoint;
            var geoPoint = geometryFactory.CreatePoint(new NetTopologySuite.Geometries.Coordinate(point.X, point.Y));

            var note = new Data.DataModels.Note
            {
                Body = text,
                Owner = user,
                Location = geoPoint
            };
            dbContext.Notes.Add(note);
            dbContext.SaveChanges();
            return note.Id;
        }

        public void UpdateNote(string username, int id, GeometryPoint geometryPoint, string body)
        {
            var user = dbContext.Users.FirstOrDefault(u => u.Username == username);
            if (user == null)
            {
                throw new UserNotFoundException($"{username} not found.");
            }
            var note = dbContext.Notes
                .FirstOrDefault(n => n.Id == id);
            if (note == null)
            {
                throw new NoteNotFoundException($"Note with {id} not found.");
            }
            if (note.Owner.Id != user.Id)
            {
                throw new System.InvalidOperationException("Only note creator can change the note");
            }
            var geometryFactory = NtsGeometryServices.Instance.CreateGeometryFactory(srid: 4326);
            var point = geometryPoint as GeometryPoint;
            var geoPoint = geometryFactory.CreatePoint(new NetTopologySuite.Geometries.Coordinate(point.X, point.Y));
            note.Location = geoPoint;
            note.Body = body;
            dbContext.SaveChanges();
        }

        public Note GetNoteById(int id)
        {
            var nu = dbContext.Notes
               .Join(dbContext.Users, n => n.Owner.Id, u => u.Id, (n, u) => new { n, u })
               .FirstOrDefault(n => n.n.Id == id);
            if (nu == null)
            {
                throw new NoteNotFoundException($"Note with {id} not found.");
            }
            return new Note
            {
                Id = nu.n.Id,
                Owner = new UserInfo
                {
                    Username = nu.u.Username,
                    Firstname = nu.u.Firstname,
                    Lastname = nu.u.Lastname
                },
                Body = nu.n.Body,
                Location = GeometryPoint.Create(nu.n.Location.Coordinate.X, nu.n.Location.Coordinate.Y)
            };
        }

        public IEnumerable<Note> GetNotesByLocation(Geometry location, int userId = 0)
        {
            var point = location as GeometryPoint;
            var geometryFactory = NtsGeometryServices.Instance.CreateGeometryFactory(srid: 4326);
            var geoPoint = geometryFactory.CreatePoint(new NetTopologySuite.Geometries.Coordinate(point.X, point.Y));

            var x = dbContext.Notes.Select(n => n.Location.Distance(geoPoint));
            return dbContext.Notes
                //.Where(n => n.Location.IsWithinDistance(geoPoint, 0.01))
                .Join(dbContext.Users, n => n.Owner.Id, u => u.Id, (n, u) => new { n, u })
                .OrderBy(n => n.n.Location.Distance(geoPoint))
                .Take(100)
                .Select(nu => new Note
                {
                    Id = nu.n.Id,
                    Owner = new UserInfo
                    {
                        Username = nu.u.Username,
                        Firstname = nu.u.Firstname,
                        Lastname = nu.u.Lastname
                    },
                    Body = nu.n.Body,
                    Location = GeometryPoint.Create(nu.n.Location.Coordinate.X, nu.n.Location.Coordinate.Y)
                });
        }

        public IEnumerable<Note> GetNotesByText(string text)
        {
            return dbContext.Notes
                .Where(n => n.Body.Contains(text))
                .Join(dbContext.Users, n => n.Owner.Id, u => u.Id, (n, u) => new { n, u })
                .Take(100)
                .Select(nu => new Note
                {
                    Id = nu.n.Id,
                    Owner = new UserInfo
                    {
                        Username = nu.u.Username,
                        Firstname = nu.u.Firstname,
                        Lastname = nu.u.Lastname
                    },
                    Body = nu.n.Body,
                    Location = GeometryPoint.Create(nu.n.Location.Coordinate.X, nu.n.Location.Coordinate.Y)
                });
        }

        public IEnumerable<Note> GetNotesByUser(int userId)
        {
            return dbContext.Notes
                .Where(n => n.Owner.Id == userId)
                .Join(dbContext.Users, n => n.Owner.Id, u => u.Id, (n, u) => new { n, u })
                .Take(100)
                .Select(nu => new Note
                {
                    Id = nu.n.Id,
                    Owner = new UserInfo
                    {
                        Username = nu.u.Username,
                        Firstname = nu.u.Firstname,
                        Lastname = nu.u.Lastname
                    },
                    Body = nu.n.Body,
                    Location = GeometryPoint.Create(nu.n.Location.Coordinate.X, nu.n.Location.Coordinate.Y)
                });
        }
    }
}

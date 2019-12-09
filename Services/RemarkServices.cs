﻿using NetTopologySuite;
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


        public int CreateNote(int userId, Geometry location, string text)
        {
            var user = dbContext.Users.FirstOrDefault(u => u.Id == userId);
            if (user == null)
            {
                throw new UserNotFoundException(userId);
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

        public IEnumerable<Note> GetNotesByLocation(Geometry location, int userId = 0)
        {
            var point = location as GeometryPoint;
            var geometryFactory = NtsGeometryServices.Instance.CreateGeometryFactory(srid: 4326);
            var geoPoint = geometryFactory.CreatePoint(new NetTopologySuite.Geometries.Coordinate(point.X, point.Y));

            var x = dbContext.Notes.Select(n => n.Location.Distance(geoPoint));
            return dbContext.Notes
                .Where(n => n.Location.IsWithinDistance(geoPoint, 0.01))
                .Join(dbContext.Users, n => n.Owner.Id, u => u.Id, (n, u) => new { n.Body, n.Location, u.Username })
                .Select(nu => new Note
                {
                    Owner = new UserInfo
                    {
                        Username = nu.Username
                    },
                    Body = nu.Body,
                    Location = GeometryPoint.Create(nu.Location.Coordinate.X, nu.Location.Coordinate.Y)
                });
        }

        public IEnumerable<Note> GetNotesByText(string text)
        {
            return dbContext.Notes
                .Where(n => n.Body.Contains(text))
                .Join(dbContext.Users, n => n.Owner.Id, u => u.Id, (n, u) => new { n.Body, n.Location, u.Username })
                .Select(nu => new Note
                {
                    Owner = new UserInfo
                    {
                        Username = nu.Username
                    },
                    Body = nu.Body,
                    Location = GeometryPoint.Create(nu.Location.Coordinate.X, nu .Location.Coordinate.Y)
                });
        }

        public IEnumerable<Note> GetNotesByUser(int userId)
        {
            return dbContext.Notes
                .Where(n => n.Owner.Id == userId)
                .Join(dbContext.Users, n => n.Owner.Id, u => u.Id, (n, u) => new { n.Body, n.Location, u.Username })
                .Select(nu => new Note
                {
                    Owner = new UserInfo
                    {
                        Username = nu.Username
                    },
                    Body = nu.Body,
                    Location = GeometryPoint.Create(nu.Location.Coordinate.X, nu.Location.Coordinate.Y)
                });
        }
    }
}

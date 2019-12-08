using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite;
using NetTopologySuite.Geometries;
using System;
using System.Linq;
using System.Spatial;
using Tigerspike.LandmarkRemark.Data;
using Tigerspike.LandmarkRemark.Data.DataModels;
using Tigerspike.LandmarkRemark.Services;
using Xunit;

namespace TestProject
{
    public class RemarkServiceTests
    {
        readonly LandmarkRemarkContext landmarkRemarkContext;
        readonly GeometryFactory geometryFactory;

        public RemarkServiceTests()
        {
            var options = new DbContextOptionsBuilder<LandmarkRemarkContext>()
                .UseInMemoryDatabase(databaseName: "Database" + Guid.NewGuid().ToString())
                .Options;
            landmarkRemarkContext = new LandmarkRemarkContext(options);
            geometryFactory = NtsGeometryServices.Instance.CreateGeometryFactory(srid: 4326);
        }

        private void CreateTestUser()
        {
            landmarkRemarkContext.Users.Add(new User { Username = "testusername", Email = "testemail@email.com", Password = "Passw0rd" });
            landmarkRemarkContext.SaveChanges();
        }

        [Fact]
        public void GetUserNotesWithLocation()
        {
            CreateTestUser();
            var user = landmarkRemarkContext.Users.FirstOrDefault();
            var location1 = geometryFactory.CreatePoint(new Coordinate(-122.121512, 47.6739882));
            var location2 = geometryFactory.CreatePoint(new Coordinate(-122.121513, 47.6739883));

            landmarkRemarkContext.Notes.Add(new Note { Owner = user, Body = "Note A", Location = location1 });
            landmarkRemarkContext.Notes.Add(new Note { Owner = user, Body = "Note B", Location = location1 });
            landmarkRemarkContext.Notes.Add(new Note { Owner = user, Body = "Note C", Location = location2 });
            landmarkRemarkContext.SaveChanges();

            var remarkService = new RemarkServices(landmarkRemarkContext);
            var notes = remarkService.GetNotesByUser(user.Id);
            notes.Should().HaveCount(3);
            var locations = notes.GroupBy(n => n.Location).Select(n => n.Key);
            locations.Should().HaveCount(2);
            locations.Should().BeEquivalentTo(new[] { 
                GeometryPoint.Create(-122.121512, 47.6739882),
                GeometryPoint.Create(-122.121513, 47.6739883)
            });
            notes.Select(n => n.Body).Should().BeEquivalentTo(new[] { "Note A", "Note B", "Note C"});
        }

        [Fact]
        public void StoreNoteOnLocation()
        {
        }

        [Fact]
        public void GetNotesTakenOnLocation()
        {

        }

        [Fact]
        public void SearchNotesByUsername()
        {

        }

        [Fact]
        public void SearchNotesByText()
        {

        }
    }
}

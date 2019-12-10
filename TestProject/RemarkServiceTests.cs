using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite;
using NetTopologySuite.Geometries;
using System;
using System.Linq;
using System.Spatial;
using Tigerspike.LandmarkRemark.Common.Exceptions;
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
            landmarkRemarkContext.Users.Add(new User { Username = "testuser1", Email = "user1@email.com", Password = "Passw0rd" });
            landmarkRemarkContext.Users.Add(new User { Username = "testuser2", Email = "user2@email.com", Password = "Passw0rd" });
            landmarkRemarkContext.SaveChanges();
        }

        private void CreateNotes()
        {
            CreateTestUser();
            var user1 = landmarkRemarkContext.Users.FirstOrDefault();
            var user2 = landmarkRemarkContext.Users.LastOrDefault();
            var location1 = geometryFactory.CreatePoint(new Coordinate(-122.12, 47.67));
            var location2 = geometryFactory.CreatePoint(new Coordinate(-122.13, 47.68));

            landmarkRemarkContext.Notes.Add(new Note { Owner = user1, Body = "Note A", Location = location1 });
            landmarkRemarkContext.Notes.Add(new Note { Owner = user2, Body = "Note B", Location = location1 });
            landmarkRemarkContext.Notes.Add(new Note { Owner = user2, Body = "Note C", Location = location2 });
            landmarkRemarkContext.SaveChanges();
        }

        [Fact]
        public void GetUserNotes()
        {
            CreateNotes();
            var userId = landmarkRemarkContext.Users.LastOrDefault().Id;

            var remarkService = new RemarkServices(landmarkRemarkContext);

            var notes = remarkService.GetNotesByUser(userId);
            notes.Should().HaveCount(2);
            var locations = notes.GroupBy(n => n.Location).Select(n => n.Key);
            locations.Should().HaveCount(2);
            locations.Should().BeEquivalentTo(new[] {
                GeometryPoint.Create(-122.12, 47.67),
                GeometryPoint.Create(-122.13, 47.68)
            });
            notes.Select(n => n.Body).Should().BeEquivalentTo(new[] { "Note B", "Note C" });
        }


        [Fact]
        public void StoreNoteOnLocation()
        {
            CreateTestUser();
            var username = landmarkRemarkContext.Users.First().Username;
            var location = GeometryPoint.Create(-122.12, 47.67);

            var remarkService = new RemarkServices(landmarkRemarkContext);

            var noteId = remarkService.CreateNote(username, location, "Note A");
            noteId.Should().Be(1);
            landmarkRemarkContext.Notes.Should().HaveCount(1);
        }

        [Fact]
        public void StoringNoteForWrongUserId_shouldThrow()
        {
            var remarkService = new RemarkServices(landmarkRemarkContext);
            var location = GeometryPoint.Create(-122.12, 47.67);

            remarkService.Invoking(rs => rs.CreateNote("testuser1", location, "Note A")).Should().Throw<UserNotFoundException>();
        }

        [Fact]
        public void GetNotesTakenOnLocation()
        {
            CreateNotes();
            var remarkService = new RemarkServices(landmarkRemarkContext);
            var notes = remarkService.GetNotesByLocation(GeometryPoint.Create(-122.13, 47.68));
            notes.Should().HaveCount(1);
            notes.First().Body.Should().Be("Note C");
            notes.First().Owner.Username.Should().Be("testuser2");
        }

        [Fact]
        public void SearchNotesByText()
        {
            CreateNotes();

            var remarkService = new RemarkServices(landmarkRemarkContext);

            var notesContain_ote = remarkService.GetNotesByText("ote");
            notesContain_ote.Should().HaveCount(3);
            var usernames = notesContain_ote.Select(n => n.Owner.Username).Distinct();
            usernames.Should().BeEquivalentTo(new[] { "testuser1", "testuser2" });

            var notesContain_B = remarkService.GetNotesByText("B");
            notesContain_B.Should().HaveCount(1);
            usernames = notesContain_B.Select(n => n.Owner.Username);
            usernames.Should().BeEquivalentTo(new[] { "testuser2" });
        }
    }
}

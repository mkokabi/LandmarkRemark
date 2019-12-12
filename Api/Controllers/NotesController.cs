using System.Linq;
using System.Security.Claims;
using System.Spatial;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Tigerspike.LandmarkRemark.Common;

namespace Tigerspike.LandmarkRemark.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        private readonly ILogger<NotesController> logger;
        private readonly IRemarkService remarkService;

        public NotesController(ILogger<NotesController> logger, IRemarkService remarkService)
        {
            this.logger = logger;
            this.remarkService = remarkService;
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public IActionResult GetNote([FromRoute]int id)
        {
            // Note note = remarkService.GetNoteById(id);
            var note = id == 1 ?
                new Note { Id = 1, Body = "Note A", Location = GeometryPoint.Create(-122.12, 47.67), Owner = new UserInfo { Username = "User 1" } } :
                new Note { Id = 2, Body = "Note B", Location = GeometryPoint.Create(-122.13, 47.68), Owner = new UserInfo { Username = "User 2" } };

            return Ok(new Model.Note(
                id: note.Id,
                body: note.Body,
                x: (note.Location as GeometryPoint).X,
                y: (note.Location as GeometryPoint).Y,
                owner: note.Owner
            ));
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetNotes([FromQuery]double x, [FromQuery]double y)
        {
            //var notes = remarkService.GetNotesByLocation(GeometryPoint.Create(x, y));
            var notes = new[] {
                new Note { Id = 1, Body = "Note A", Location = GeometryPoint.Create(-122.12, 47.67), Owner = new UserInfo { Username = "User 1" } },
                new Note { Id = 2, Body = "Note B", Location = GeometryPoint.Create(-122.13, 47.68), Owner = new UserInfo { Username = "User 2" } }
            };
            return Ok(notes.Select(n => new Model.Note(
                id: n.Id,
                body: n.Body,
                x: (n.Location as GeometryPoint).X,
                y: (n.Location as GeometryPoint).Y,
                owner: n.Owner
            )));
        }

        [Authorize]
        [HttpPost]
        public IActionResult TakeNote(Model.Note note)
        {
            var username = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Upn).Value;
            remarkService.CreateNote(username, GeometryPoint.Create(note.X, note.Y), note.Body);
            return Ok();
        }
    }
}
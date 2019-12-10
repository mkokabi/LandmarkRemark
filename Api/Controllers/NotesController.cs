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
        [HttpGet]
        public IActionResult GetNotes([FromQuery]double x, [FromQuery]double y)
        {
            var notes = remarkService.GetNotesByLocation(GeometryPoint.Create(x, y));
            return Ok(notes.Select(n => new Model.Note(
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
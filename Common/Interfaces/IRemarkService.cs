using System.Collections.Generic;
using System.Spatial;

namespace Tigerspike.LandmarkRemark.Common
{
    public interface IRemarkService
    {
        /// <summary>
        /// Return notes taken by this user
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        IEnumerable<Note> GetNotesByUser(int userId);

        /// <summary>
        /// Return notes taken closed by this location.
        /// </summary>
        /// <param name="location">The location which all the returned notes would be near to</param>
        /// <param name="userId">If provided, the response would be filtered by this user.</param>
        /// <returns></returns>
        IEnumerable<Note> GetNotesByLocation(Geometry location, int userId = 0);
        Note GetNoteById(int id);

        /// <summary>
        /// Text search and return the notes.
        /// </summary>
        /// <param name="text">search text</param>
        /// <returns></returns>
        IEnumerable<Note> GetNotesByText(string text);

        /// <summary>
        /// Create a note
        /// </summary>
        /// <param name="username">The owner</param>
        /// <param name="location">The location note has been taken</param>
        /// <param name="text">The note text.</param>
        /// <returns></returns>
        int CreateNote(string username, Geometry location, string text);
    }
}

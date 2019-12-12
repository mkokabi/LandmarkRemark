using System;
using System.Runtime.Serialization;

namespace Tigerspike.LandmarkRemark.Common.Exceptions
{
    public class NoteNotFoundException : Exception
    {
        public NoteNotFoundException()
        {
        }

        public NoteNotFoundException(string message) : base(message)
        {
        }

        public NoteNotFoundException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected NoteNotFoundException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}

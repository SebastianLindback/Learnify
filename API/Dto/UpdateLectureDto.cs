using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto
{
    public class UpdateLectureDto
    {
        public int LectureId { get; set; }

        public Guid CourseId { get; set; }
    }
}
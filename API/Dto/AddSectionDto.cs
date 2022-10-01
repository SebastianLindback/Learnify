using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto
{
    public class AddSectionDto
    {
        public Guid CourseId { get; set; }
        public string SectionName { get; set; }
        public List<LectureDto> Lectures { get; set; }
    }
}
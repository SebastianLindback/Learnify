namespace API.Dto
{
    public class SectionDto
    {
        public string? SectionName { get; set; }

        public List<LectureDto>? Lectures { get; set; }
    }
}
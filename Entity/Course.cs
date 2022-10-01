
using System;
namespace Entity
{
    public class Course : BaseEntity
    {

        public string? Title { get; set; }

        public string? Language { get; set; }

        public string? Level { get; set; }

        public string? SubTitle { get; set; }

        public int Students { get; set; }

        public string? Description { get; set; }

        public float Price { get; set; }

        public string? Instructor { get; set; }

        public bool Published { get; set; } = false;

        public string? Image { get; set; } = "https://learnify-assets.s3.amazonaws.com/Images/learnify.png";

        public decimal Rating { get; set; }

        public ICollection<Requirement> Requirements { get; set; } = new List<Requirement>();

        public ICollection<Learning> Learnings { get; set; } = new List<Learning>();

        public int CategoryId { get; set; }

        public Category? Category { get; set; }

        public DateTime LastUpdated { get; set; } = DateTime.Now;

        public ICollection<UserCourse> UserCourses { get; set; } = new List<UserCourse>();

        public ICollection<Section> Sections { get; set; } = new List<Section>();


    }
}
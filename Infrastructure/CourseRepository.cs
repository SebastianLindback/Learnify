using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entity;
using Entity.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace Infrastructure
{
    public class CourseRepository : ICourseRepository
    {
        private readonly StoreContext _context;
        public CourseRepository(StoreContext context)
        {
            _context = context;
        }

        public async Task<Course> GetCourseByIdAsync(Guid id)
        {
            return await _context.Courses.FindAsync(id);
        }


        public async Task<IReadOnlyList<Course>> GetCoursesAsync()
        {
            return await _context.Courses.ToListAsync();
        }
    }
}
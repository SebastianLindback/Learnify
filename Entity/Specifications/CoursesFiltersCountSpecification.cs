using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Entity.Specifications
{
    public class CoursesFiltersCountSpecification : BaseSpecification<Course>
    {
        public CoursesFiltersCountSpecification(CourseParams courseParams) : base(x =>
        (string.IsNullOrEmpty(courseParams.Search) || x.Title!.ToLower().Contains(courseParams.Search)) &&
        (!courseParams.CategoryId.HasValue || x.CategoryId == courseParams.CategoryId))
        {
        }
    }
}
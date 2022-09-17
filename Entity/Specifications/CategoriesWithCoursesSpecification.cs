using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Entity.Specifications
{
    public class CategoriesWithCoursesSpecification : BaseSpecification<Category>
    {
        public CategoriesWithCoursesSpecification(int id) : base(x => x.Id == id)
        {
            IncludeMethod(c => c.Courses);
            SortMethod(x => x.Id);
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entity;

namespace API.Dto
{
    public class UserDto
    {
        public string Email { get; set; }

        public string Token { get; set; }

        public BasketDto Basket { get; set; }

        public List<Course> Courses { get; set; }
    }
}
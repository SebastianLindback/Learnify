using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Entity.Specifications
{
    public class CourseParams
    {
        public string? Sort { get; set; }

        public int? CategoryId { get; set; }

        public int PageIndex { get; set; }

        private int _pageSize = 3;
        private const int MaxPageSize = 20;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

        private string _search;

        public string Search
        {
            get => _search;
            set => _search = value.ToLower();
        }
    }
}
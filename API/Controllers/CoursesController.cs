using API.Dto;
using AutoMapper;
using Entity.Specifications;

namespace API.Controllers
{
    public class CoursesController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly IGenericRepository<Course> _repository;

        public CoursesController(IGenericRepository<Course> repository, IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;

        }

        [HttpGet]

        public async Task<ActionResult<Pagination<CourseDto>>> GetCourses([FromQuery] CourseParams courseParams)
        {
            var spec = new CoursesWithCategoriesSpecification(courseParams);
            var countSpec = new CoursesFiltersCountSpecification(courseParams);
            var total = await _repository.CountResultAsync(countSpec);
            var courses = await _repository.ListWithSpec(spec);
            var data = _mapper.Map<IReadOnlyList<Course>, IReadOnlyList<CourseDto>>(courses);
            return Ok(new Pagination<CourseDto>(courseParams.PageIndex, courseParams.PageSize, total, data));
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<CourseDto>> GetCourse(Guid id)
        {
            var spec = new CoursesWithCategoriesSpecification(id);
            var course = await _repository.GetEntityWithSpec(spec);
            return _mapper.Map<Course, CourseDto>(course);
        }


    }
}
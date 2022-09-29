using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto;
using AutoMapper;
using Entity;
using Entity.Specifications;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Course, CourseDto>()
            .ForMember(
                c => c.Category,
                o => o.MapFrom(
                    s => s.Category.Name
                    ));

            CreateMap<Requirement, RequirementDto>();

            CreateMap<Learning, LearningDto>();

            CreateMap<Category, CategoryDto>();

            CreateMap<Category, CategoriesDto>();

            CreateMap<Basket, BasketDto>();

            CreateMap<BasketItem, BasketItemDto>()
            .ForMember(b => b.CourseId, o => o.MapFrom(c => c.Course.Id))
            .ForMember(b => b.Title, o => o.MapFrom(c => c.Course.Title))
            .ForMember(b => b.Price, o => o.MapFrom(c => c.Course.Price))
            .ForMember(b => b.Image, o => o.MapFrom(c => c.Course.Image))
            .ForMember(b => b.Instructor, o => o.MapFrom(c => c.Course.Instructor));

            CreateMap<Section, SectionDto>()
            .ForMember(s => s.SectionName, o => o.MapFrom(c => c.Name));
            CreateMap<Lecture, LectureDto>();

        }
    }
}
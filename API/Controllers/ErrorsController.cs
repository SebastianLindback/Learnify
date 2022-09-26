using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.ErrorResponse;
using Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    public class ErrorsController : BaseController
    {
        private readonly StoreContext _context;

        public ErrorsController(StoreContext context)
        {
            _context = context;
        }
        [HttpGet("authcheck")]
        [Authorize]

        public ActionResult<string> CheckAuthorization()
        {
            return "You are authorized";
        }

        [HttpGet("notFound")]
        public IActionResult NotFoundMethod()
        {
            var category = _context.Categories.Find(42);
            if (category == null) return NotFound(new ApiResponse(404));
            return Ok();
        }
        [HttpGet("serverError")]
        public IActionResult ServerErrorMethod()
        {
            var category = _context.Categories.Find(42);

            return Ok(category.ToString());
        }
        [HttpGet("badRequest")]
        public IActionResult BadRequestMethod()
        {
            return BadRequest(new ApiResponse(400));
        }
        [HttpGet("badRequest/{id}")]
        public IActionResult BadIdMethod(int id)
        {
            return Ok(BadRequest());
        }


    }
}
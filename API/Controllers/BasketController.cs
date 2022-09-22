using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.ErrorResponse;
using Entity.Specifications;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [Route("[controller]")]
    public class BasketController : BaseController
    {
        private readonly StoreContext _context;
        public BasketController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]

        public async Task<ActionResult<Basket>> GetBasket()
        {
            var basket = await ExtractBasket();

            if (basket == null) return NotFound(new ApiResponse(404));

            return basket;
        }

        [HttpPost]

        public async Task<ActionResult<Basket>> AddItemToBasket(Guid courseId)
        {
            var basket = await ExtractBasket();

            if (basket == null) basket = CreateBasket();

            var course = await _context.Courses.FindAsync(courseId);

            if (course == null) return NotFound(new ApiResponse(404));

            basket.AddCourseItem(course);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return basket;

            return BadRequest(new ApiResponse(400, "Problem saving item to the Basket"));
        }

        private Basket CreateBasket()
        {
            var clientId = Guid.NewGuid().ToString();
            var options = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(10) };
            Response.Cookies.Append("clientId", clientId, options);
            var basket = new Basket { ClientId = clientId };
            _context.Baskets.Add(basket);
            return basket;
        }

        private async Task<Basket> ExtractBasket()
        {
            return await _context.Baskets
                        .Include(b => b.Items)
                        .ThenInclude(i => i.Course)
                        .FirstOrDefaultAsync(x => x.ClientId == Request.Cookies["clientId"]);

        }

    }
}
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.ErrorResponse;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [Route("redirect/{code}")]
    public class RedirectController : BaseController
    {
        public IActionResult Error(int code)
        {
            return new OkObjectResult(new ApiResponse(code));
        }


    }
}
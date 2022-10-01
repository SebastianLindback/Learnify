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
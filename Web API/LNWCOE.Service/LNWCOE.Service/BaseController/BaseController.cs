using LNWCOE.Service.Exceptions;
using LNWCOE.Service.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;

namespace LNWCOE.Service.BaseController
{
    [Authorize]
    [ValidateModel]
    [Produces("application/json")]
    [ApiVersion("1.0")]
    [ServiceFilter(typeof(CustomExceptionFilterAttribute))]
    public class ControllerBase<T> : Controller where T : ControllerBase<T>
    {
        private ILogger<T> _logger;
        protected ILogger<T> Logger => _logger ?? (_logger = HttpContext.RequestServices.GetService<ILogger<T>>());
    }
}

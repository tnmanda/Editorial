using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using static LNWCOE.Helpers.Common;

namespace LNWCOE.Modules.Admin.SSO
{
    [Produces("application/json")]
    [Route("api/SSO")]
    [Authorize]
    public class SSOController : Controller
    {
        private IConfiguration _configuration;

        public SSOController(IConfiguration configuration)
        {
            this._configuration = configuration;
        }

        [HttpGet]
        // Placeholder for the SSO routine, this will call an API from LN
        public SSOData Get()
        {
            SSOData data = new SSOData();

            var ssourl = _configuration.GetSection("EditorialSettings:SingleSignOnUrl").Value;
            var email = User.Claims.Where(x => x.Type == "eml").FirstOrDefault().Value;

            var claims = User.Claims.ToString();
            var accesToken = Request.Headers["Authorization"];

            data.Email = email;
            data.Token = accesToken; // Editorial API Token, use this for the mean time
            data.Url = ssourl;

            return data;
        }
    }
}
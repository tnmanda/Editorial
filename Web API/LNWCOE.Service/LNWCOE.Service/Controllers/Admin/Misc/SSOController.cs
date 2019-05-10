using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Models.Admin.Misc;
using LNWCOE.Module.Admin.Interface;
using LNWCOE.Service.BaseController;
using LNWCOE.Service.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace LNWCOE.Service.Controllers.Admin.Misc
{
    [Route("api/SSO")]
    public class SSOController : ControllerBase<SSOController>
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
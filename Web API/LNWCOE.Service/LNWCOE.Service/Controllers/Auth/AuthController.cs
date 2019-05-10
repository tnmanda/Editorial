using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using LNWCOE.Models.Auth;
using LNWCOE.Module.Admin.Interface;
using LNWCOE.Service.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace LNWCOE.Service.Controllers.Auth
{
    [Produces("application/json")]
    [Route("api/Auth")]
    [AllowAnonymous]
    public class AuthController : Controller
    {
        private readonly IConfigurationRoot _config;
        private readonly ILogger<AuthController> _logger;
        private readonly IHREditorialUserMapRepository _userMapRepository;

        const string FailedToGenerateTokenError = "Failed to generate a token";
        const string InvalidLoginError = "Invalid Login";

        public AuthController(IConfigurationRoot config, ILogger<AuthController> logger, IHREditorialUserMapRepository userMapRepository)
        {
            _config = config;
            _logger = logger;
            _userMapRepository = userMapRepository;
        }

        [HttpPost("apitoken")]
        [ValidateModel]
        public IActionResult Token([FromBody] LoginInfo loginInfo)
        {
            try
            {
                var apitokendata = CreateApiToken(loginInfo);
                if (apitokendata == null)
                {
                    return BadRequest(FailedToGenerateTokenError);
                }
                var hrtoken = GetHRTokenAsync(loginInfo);
                if (hrtoken == null)
                {
                    return BadRequest(FailedToGenerateTokenError);
                }
                TokenData hrtokendata = hrtoken.Result;

                return Ok(new
                {
                    hrtokendata,
                    apitokendata
                });
            }
            catch (Exception e)
            {
                _logger.LogError(ControllerContext.ActionDescriptor.ActionName +
                    " Exception " + e.Message
                    + " InnerException " + e.InnerException.Message);
            }
            return BadRequest(InvalidLoginError);
        }

        [HttpPost("apitokenonly")]
        [ValidateModel]
        public IActionResult ApiTokenOnly([FromBody] LoginInfo loginInfo)
        {
            try
            {
                var token = CreateApiToken(loginInfo);
                if (token == null)
                {
                    return BadRequest(FailedToGenerateTokenError);
                }
                return Ok(token);
            }
            catch (Exception e)
            {
                _logger.LogError(ControllerContext.ActionDescriptor.ActionName +
                    " Exception " + e.Message
                    + " InnerException " + e.InnerException.Message);
            }
            return BadRequest(InvalidLoginError);
        }

        [HttpPost("token")]
        public IActionResult HrtokenAsync([FromBody] LoginInfo loginInfo)
        {
            try
            {
                var token = GetHRTokenAsync(loginInfo);
                if (token == null)
                {
                    return BadRequest(FailedToGenerateTokenError); ;
                }
                var t = token.Result;

                return Ok(t);
            }
            catch (Exception e)
            {
                _logger.LogError(ControllerContext.ActionDescriptor.ActionName +
                   " Exception " + e.Message
                   + " InnerException " + e.InnerException.Message);
            }

            return BadRequest(InvalidLoginError);
        }

        private async Task<TokenData> GetHRTokenAsync(LoginInfo loginInfo)
        {
            TokenData nulltokendata = null;

            string hruri = _config["HumanReview:uri"] + "Auth/token";
            Uri uri = new Uri(hruri);
            HttpResponseMessage response;

            HttpClient client;

            using (client = new HttpClient())
            {
                var ReadyClient = Helper.InitializeHttpClient(client, string.Empty);

                var jsonText = JsonConvert.SerializeObject(loginInfo);
                var jsonContent = new StringContent(jsonText, UnicodeEncoding.UTF8, "application/json");

                response = await ReadyClient.PostAsync(uri, jsonContent);

                response.EnsureSuccessStatusCode();

                ReadyClient.Dispose();
            }

        
            try
            {
                string dataString = await response.Content.ReadAsStringAsync();
                TokenData tokendata = JsonConvert.DeserializeObject<TokenData>(dataString);

                return (tokendata);
            }
            catch (Exception e)
            {
                _logger.LogError(ControllerContext.ActionDescriptor.ActionName +
                   " Exception " + e.Message
                   + " InnerException " + e.InnerException.Message);
            }

            return nulltokendata;
        }
  
        private TokenData CreateApiToken(LoginInfo loginInfo)
        {
            string TokenKey = _config["TokenValues:key"];
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(TokenKey));
            var signInCreds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            string domain = loginInfo.domain;
            string userName = loginInfo.userName;
            string password = loginInfo.password;
            string groupcode = loginInfo.groupcode;

            TokenData apitokendata = null;

            try
            {
                var ThisUser = _userMapRepository.GetAuthInfoByName(loginInfo.userName);
                if (ThisUser == null)
                {
                    return apitokendata;
                    //return BadRequest("Failed to generate a token");
                }

                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, userName),  // HR identity
                    new Claim(JwtRegisteredClaimNames.GivenName, ThisUser.UserName), // Editorial identity
                    new Claim("rol", ThisUser.RoleTypeID.ToString()), // Editorial Role
                    new Claim("appuser_id", ThisUser.AppUserId), // Editorial User ID
                    new Claim("eml", ThisUser.Email) // Editorial User Email
                };


                var token = new JwtSecurityToken(
                    issuer: _config["TokenValues:Issuer"],
                    audience: _config["TokenValues:Audience"],
                            expires: DateTime.UtcNow.AddMinutes(Convert.ToInt32(_config["TokenValues:expiresInMinutes"])),
                            claims: claims,
                            signingCredentials: signInCreds
                            );

                var ApiToken = new JwtSecurityTokenHandler().WriteToken(token);
                var ApiTokenExpiration = token.ValidTo;

                apitokendata = new TokenData { token = ApiToken, expiration = ApiTokenExpiration };
                return apitokendata;
            }
            catch (Exception e)
            {
                _logger.LogError(ControllerContext.ActionDescriptor.ActionName +
                   " Exception " + e.Message
                   + " InnerException " + e.InnerException.Message);
            }
            return apitokendata;
        }
    }
}
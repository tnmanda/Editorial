using System;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;
using LNWCOE.Data;
using LNWCOE.Models.Auth;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Linq;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Logging;
using LNWCOE.Models.Admin;

namespace LNWCOE.Helpers.Auth
{
    [Route("api/[Controller]")]
    [Produces("application/json")]
    [AllowAnonymous]
    public class AuthController : Controller
    {
        private readonly AppDbContext _context;
        private IConfiguration _configuration;
        private readonly ILogger<AuthController> _logger;

        HttpClient client;

        public AuthController(AppDbContext context, IConfiguration configuration, ILogger<AuthController> logger)
        {
            _context = context;
            _configuration = configuration;
            _logger = logger;
        }
        /*
        [HttpPost("hrtoken")]
        public async Task<IActionResult> TokenAsync([FromBody] LoginInfo loginInfo)
        {
            // TODO: Change to HumanReview -> uri in config
            string hruri = _configuration.GetSection("HumanReview:uri").Value;
            Uri uri = new Uri(hruri);

            client.DefaultRequestHeaders.Accept.Clear();

            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json");
            client.DefaultRequestHeaders.TryAddWithoutValidation("X-HumanReviewApi-Version", "1.0");

            var jsonText = JsonConvert.SerializeObject(loginInfo);
            var jsonContent = new StringContent(jsonText, UnicodeEncoding.UTF8, "application/json");

            try
            {
                HttpResponseMessage response = await client.PostAsync(uri, jsonContent);
                response.EnsureSuccessStatusCode();
                // TODO: Log the value of HttpRequestException

                var dataString = await response.Content.ReadAsStringAsync();
                TokenData tokendata = JsonConvert.DeserializeObject<TokenData>(dataString);

                return Json(tokendata);
            }
            catch (Exception e)
            {
                // TODO: log Exception e
                return BadRequest("Invalid Login");
            }

        }
        */


        [HttpPost("hrtoken")]
        public async Task<TokenData> HrtokenAsync([FromBody] LoginInfo loginInfo)
        {
            // TODO: Change to HumanReview -> uri in config
            string hruri = _configuration.GetSection("HumanReview:uri").Value + "Auth/token";
            Uri uri = new Uri(hruri);
            HttpResponseMessage response;

            using (client = new HttpClient())
            {
                client.DefaultRequestHeaders.Accept.Clear();

                client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json");
                client.DefaultRequestHeaders.TryAddWithoutValidation("X-HumanReviewApi-Version", "1.0");

                var jsonText = JsonConvert.SerializeObject(loginInfo);
                var jsonContent = new StringContent(jsonText, UnicodeEncoding.UTF8, "application/json");

                response = await client.PostAsync(uri, jsonContent);
                response.EnsureSuccessStatusCode();
            }
            try
            {
                var dataString = await response.Content.ReadAsStringAsync();
                TokenData tokendata = JsonConvert.DeserializeObject<TokenData>(dataString);

                return (tokendata);
            }
            catch (Exception e)
            {
                // TODO: log Exception e
                // TODO: Log the value of HttpRequestException
                TokenData nulltokendata = null;
                _logger.LogError(ControllerContext.ActionDescriptor.ActionName +
                    " Exception " + e.Message
                    + " InnerException " + e.InnerException.Message);

                return nulltokendata;
            }

        }

        [HttpPost("apitoken")]
        public IActionResult Token([FromBody] LoginInfo loginInfo)
        {
            if (loginInfo == null) {
                return BadRequest("Invalid Login");
            }

           
            string domain = loginInfo.domain;
            string userName = loginInfo.userName;
            string password = loginInfo.password;
            string groupcode = loginInfo.groupcode;

            var query = from r in _context.HREditorialUserMap
                        where r.HumanReviewUserID == userName
                        select r;

            if (query.Any()) 
            {
                // TODO: catch exceptions
                if(query.Count() > 1)
                {
                    return BadRequest("User " + userName  + " mapped to multiple Users");
                }

                var hrtokendata = HrtokenAsync(loginInfo).Result;
                
                var thisUser = query.Single();


                var rolequery = (from users in _context.AppUser
                                 join roles in _context.AppUserInRole on users.AppUserID equals roles.AppUserID
                                 join roletypes in _context.RoleType on roles.RoleTypeID equals roletypes.RoleTypeID
                                 where users.AppUserID == thisUser.AppUserID
                                 select new { roletypes.RoleTypeID, users.AppUserName, users.Email }).Single();
                if (rolequery == null)
                {
                    return BadRequest("User " + userName + " has no role defined");
                }

                string TokenKey = _configuration.GetSection("TokenValues:key").Value;
                string TokenIssuer = _configuration.GetSection("TokenValues:issuer").Value;
                string TokenAudience = _configuration.GetSection("TokenValues:audience").Value;
                string TokenExpiresInMinutes = _configuration.GetSection("TokenValues:expiresInMinutes").Value;
                
                if (thisUser.HumanReviewUserID == userName) 
                {
                    // TODO: Log information here

                    var claimsData = new[] 
                    {
                        new Claim(JwtRegisteredClaimNames.Sub, userName),  // HR identity
                        new Claim(JwtRegisteredClaimNames.GivenName, rolequery.AppUserName), // Editorial identity
                        new Claim("rol", rolequery.RoleTypeID.ToString()), // Editorial Role
                        new Claim("appuser_id", thisUser.AppUserID.ToString()), // Editorial User ID
                        new Claim("eml", rolequery.Email.ToString()) // Editorial User ID
                    };
                    var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(TokenKey));

                    var signInCreds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                    var token = new JwtSecurityToken(
                        issuer: TokenIssuer,
                        audience: TokenAudience,
                        expires: DateTime.UtcNow.AddMinutes(Convert.ToInt32(TokenExpiresInMinutes)),
                        claims: claimsData,
                        signingCredentials: signInCreds
                        );
                    //token.Payload["IPa"] = UserIPa;

                    var ApiToken = new JwtSecurityTokenHandler().WriteToken(token);
                    var ApiTokenExpiration = token.ValidTo;

                    

                    TokenData apitokendata = new TokenData { token = ApiToken, expiration = ApiTokenExpiration };

                    return Ok(new
                    {
                        hrtokendata,
                        apitokendata
                    });
                }
            }

            return BadRequest("Invalid Login");
        }

        [HttpPost("apitokenonly")]
        public TokenData ApiTokenOnly([FromBody] LoginInfo loginInfo)
        {
            if (loginInfo == null)
            {
                return new TokenData { token = "Invalid user", expiration = DateTime.Today };
            }


            string domain = loginInfo.domain;
            string userName = loginInfo.userName;
            string password = loginInfo.password;
            string groupcode = loginInfo.groupcode;

            var query = from r in _context.HREditorialUserMap
                        where r.HumanReviewUserID == userName
                        select r;

            if (query.Any())
            {
                // TODO: catch exceptions
                var thisUser = query.Single();

                var rolequery = (from users in _context.AppUser
                                 join roles in _context.AppUserInRole on users.AppUserID equals roles.AppUserID
                                 join roletypes in _context.RoleType on roles.RoleTypeID equals roletypes.RoleTypeID
                                 where users.AppUserID == thisUser.AppUserID
                                 select new { roletypes.RoleTypeID, users.AppUserName }).Single();

                string TokenKey = _configuration.GetSection("TokenValues:key").Value;
                string TokenIssuer = _configuration.GetSection("TokenValues:issuer").Value;
                string TokenAudience = _configuration.GetSection("TokenValues:audience").Value;
                string TokenExpiresInMinutes = _configuration.GetSection("TokenValues:expiresInMinutes").Value;

                if (thisUser.HumanReviewUserID == userName)
                {
                    // TODO: Log information here

                    var claimsData = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Sub, userName),  // HR identity
                        new Claim(JwtRegisteredClaimNames.GivenName, rolequery.AppUserName), // Editorial identity
                        new Claim("rol", rolequery.RoleTypeID.ToString()) // Editorial Role
                    };
                    var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(TokenKey));

                    var signInCreds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                    var token = new JwtSecurityToken(
                        issuer: TokenIssuer,
                        audience: TokenAudience,
                        expires: DateTime.UtcNow.AddMinutes(Convert.ToInt32(TokenExpiresInMinutes)),
                        claims: claimsData,
                        signingCredentials: signInCreds
                        );
                    //token.Payload["IPa"] = UserIPa;

                    var ApiToken = new JwtSecurityTokenHandler().WriteToken(token);
                    var ApiTokenExpiration = token.ValidTo;

                    TokenData apitokendata = new TokenData { token = ApiToken, expiration = ApiTokenExpiration };

                    return apitokendata;
                }
            }

            return new TokenData { token = "Login failed, no token provided", expiration = DateTime.Today };
        }
    }
}

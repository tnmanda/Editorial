//using System.Linq;

//using System.Security.Claims;
//using System.Threading.Tasks;
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.Mvc.Filters;

//namespace LNWCOE.Modules.Auth
//{
//    // 2
//    public class ApiAuthorize2Attribute : AuthorizeAttribute
//    {
//        protected override bool AuthorizeCore(HttpContextBase httpContext)
//        {
//            var authorized = base.AuthorizeCore(httpContext);
//            if (!authorized)
//            {
//                // The user is not authenticated
//                return false;
//            }

//            var user = httpContext.User;
//            if (user.IsInRole("Admin"))
//            {
//                // Administrator => let him in
//                return true;
//            }

//            var rd = httpContext.Request.RequestContext.RouteData;
//            var id = rd.Values["id"] as string;
//            if (string.IsNullOrEmpty(id))
//            {
//                // No id was specified => we do not allow access
//                return false;
//            }

//            return IsOwnerOfPost(user.Identity.Name, id);
//        }
//    }


//    // 1
//    public class ApiAuthorizeAttribute : TypeFilterAttribute
//    {
//        public ApiAuthorizeAttribute(string claimType, string claimValue) : base(typeof(ClaimRequirementFilter))
//        {
//            Arguments = new object[] { new Claim(claimType, claimValue) };
//        }
//    }

//    public class ClaimRequirementFilter : IAuthorizationFilter
//    {
//        readonly Claim _claim;

//        public ClaimRequirementFilter(Claim claim)
//        {
//            _claim = claim;
//        }

//        public void OnAuthorization(AuthorizationFilterContext context)
//        {
//            var hasClaim = context.HttpContext.User.Claims.Any(c => c.Type == _claim.Type && c.Value == _claim.Value);
//            if (!hasClaim)
//            {
//                context.Result = new ForbidResult();
//            }
//        }
//    }


//    /////////////
//    public class IssuerRequirement : IAuthorizationRequirement
//    {
//        public string Issuer { get; private set; }

//        public IssuerRequirement(string issuer)
//        {
//            Issuer = issuer;
//        }
//    }


//    public class IssuerHandler : AuthorizationHandler<IssuerRequirement>
//    {
//        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
//                                                       IssuerRequirement requirement)
//        {
//            ;

//            if (context.User.HasClaim(c => c.Issuer == "http://humanreview.api.risk.lexisnexis.com"))
//            {
//                context.Succeed(requirement);
//            }


//            /*
//             * 
//             * if (!context.User.HasClaim(c => c.Type == ClaimTypes.Expiration &&
//                                            c.Issuer == "http://humanreview.api.risk.lexisnexis.com"))
//            {
//                return Task.CompletedTask;
//            }

//            var dateOfBirth = Convert.ToDateTime(
//                context.User.FindFirst(c => c.Type == ClaimTypes.DateOfBirth &&
//                                            c.Issuer == "http://humanreview.api.risk.lexisnexis.com").Value);

//            int calculatedAge = DateTime.Today.Year - dateOfBirth.Year;
//            if (dateOfBirth > DateTime.Today.AddYears(-calculatedAge))
//            {
//                calculatedAge--;
//            }

//            if (calculatedAge >= requirement.MinimumAge)
//            {
//                context.Succeed(requirement);
//            }
//            */
//            //TODO: Use the following if targeting a version of
//            //.NET Framework older than 4.6:
//            //      return Task.FromResult(0);
//            return Task.CompletedTask;
//        }
//    }

//}

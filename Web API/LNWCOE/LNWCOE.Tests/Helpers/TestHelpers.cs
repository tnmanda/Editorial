using System;
using System.Collections.Generic;
using System.Configuration;
using System.Text;
using LNWCOE.Data;
using LNWCOE.Models.Admin;
using LNWCOE.Models.Auth;
using LNWCOE.Helpers.Auth;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Moq;

namespace LNWCOE.Tests.Helpers
{

    

    public class TestHelpers
    {
        public static IConfiguration Configuration { get; set; }
        //public static IHostingEnvironment env { get; set; }
        

        public TokenData GetToken()
        {

            Mock<AppDbContext> _dbcontextMock = new Mock<AppDbContext>();
            Mock<IConfiguration> _configurationMock = new Mock<IConfiguration>();
            AuthController _authController;

            // Mock DB
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "Editorial_MockDB")
                .Options;

            var context = new AppDbContext(options, null);

            //context.AppUser.Add(new AppUser {  Email = "test@test.com", Name = "Test User" });

            context.AppUser.Add(new AppUser { Email = "test@test.com", AppUserName = "hrevuser1" });
            context.HREditorialUserMap.Add(new HREditorialUserMap { HumanReviewUserID = "hrevuser1", AppUserID = 1, });
            context.AppUserInRole.Add(new AppUserInRole { AppUserID = 1, RoleTypeID = 1 });
            context.RoleType.Add(new RoleType { RoleTypeID = 1, RoleTypeName = "User Type 1" });


            context.SaveChanges();

            //Mock Config
            var dict = new Dictionary<string, string>
            {
                { "TokenValues:issuer", "http://editorial-api.spi-global.com"},
                { "TokenValues:audience", "http://editorial-ui.spi-global.com"},
                {"TokenValues:expiresInMinutes", "300"},
                {"TokenValues:key", "my-secret-key-to-use"},
                {"HumanReview:uri", "http://bgpc000032913:8089/api/auth/token"},
                {"WebApi:uri", "http://bgpc000032913:8083"}
            };

            var builder = new ConfigurationBuilder();
            builder.AddInMemoryCollection(dict);

            Configuration = builder.Build();

            ILogger<AuthController> _logger = null;

            _authController = new AuthController(context, Configuration, _logger);

            var user = new LoginInfo { domain = "hrev", userName = "hrevuser1", password = "testpw123!", groupcode = "HRWCOJOB" };

            var result = _authController.ApiTokenOnly(user);
            //var okResult = result as OkObjectResult;

            /*
            var hr = new HREditorialUserMap { HumanReviewUserID = "hrevuser1", AppUserID = 1, };
            context.HREditorialUserMap.Remove(hr);

            var uirole = new AppUserInRole { AppUserID = 1, RoleTypeID = 1 };
            context.AppUserInRole.Remove(uirole);

            var rt = new RoleType { RoleTypeID = 1, RoleTypeName = "User Type 1" };
            context.RoleType.Remove(rt);

            AppUser ap = new AppUser { AppUserID = 1, Email = "test@test.com", AppUserName = "hrevuser1" };
            context.AppUser.Remove(ap); //
            */

            return result;
        }   


    }
}

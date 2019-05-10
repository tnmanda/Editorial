using Moq;
using Xunit;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Hosting;

using LNWCOE.Helpers.Auth;
using LNWCOE.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using LNWCOE.Models.Admin;
using Microsoft.Extensions.Logging;
using LNWCOE.Models.Auth;
using Microsoft.AspNetCore.Mvc;
using System;

namespace LNWCOE.Tests
{
    public class AuthControllerTest
    {
        public static IConfiguration Configuration { get; set; }

        [Fact]
        public void ApiTokenTest()
        {
            AuthController _authController;

            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            var context = new AppDbContext(options, null);

            context.AppUser.Add(new AppUser { AppUserID = 1, Email = "test@test.com", AppUserName = "hrevuser1" });
            context.HREditorialUserMap.Add(new HREditorialUserMap { HumanReviewUserID = "hrevuser1", AppUserID = 1, });
            context.AppUserInRole.Add(new AppUserInRole { AppUserID = 1, RoleTypeID = 1 });
            context.RoleType.Add(new RoleType {  RoleTypeID = 1, RoleTypeName = "User Type 1" });

            context.SaveChanges();

            //Mock Config
            var dict = new Dictionary<string, string>
            {
                {"TokenValues:issuer", "http://editorial-api.spi-global.com"},
                {"TokenValues:audience", "http://editorial-ui.spi-global.com"},
                {"TokenValues:expiresInMinutes", "300"},
                {"TokenValues:key", "my-secret-key-to-use"},
                {"HumanReview:uri", "http://bgpc000032913:8089/api/"},
                {"WebApi:uri", "http://bgpc000032913:8083"}
            };
            var builder = new ConfigurationBuilder();
            builder.AddInMemoryCollection(dict);

            Configuration = builder.Build();

            ILogger<AuthController> _logger = null;

            _authController = new AuthController(context, Configuration, _logger);

            var user = new LoginInfo { domain = "hrev", userName = "hrevuser1", password = "testpw123!", groupcode = "HRWCOJOB" };
            
            var result = _authController.Token(user);
            var okResult = result as OkObjectResult;
            
            // 1
            Assert.NotNull(result);
            Assert.Equal(200, okResult.StatusCode);

            // 2
            var apitoken = _authController.ApiTokenOnly(user);
            Assert.NotNull(apitoken);
            var tokenexpiry = apitoken.expiration;
            var timenow = DateTime.UtcNow;
            Assert.True(tokenexpiry > timenow);



            
        }
    }
}

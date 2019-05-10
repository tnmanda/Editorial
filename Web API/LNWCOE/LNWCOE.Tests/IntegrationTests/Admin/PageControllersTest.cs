using Xunit;
using LNWCOE.Tests.Helpers;
using System;
using LNWCOE.Helpers.Admin.Pages;
using LNWCOE.Data;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Net.Http;
using Newtonsoft.Json;
using LNWCOE.Models.Auth;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace LNWCOE.Tests.Modules.Admin
{

    public class PageControllersTest
    {
        //private readonly AppDbContext _testcontext;
        //private readonly ILogger<PageController> _testlogger;
        private IConfiguration _configuration;

        private readonly DbContextOptions<AppDbContext> options;

        public PageControllersTest()
        {
            var builder = new DbContextOptionsBuilder<AppDbContext>();
            builder.UseInMemoryDatabase("Editorial_MockDB");
            options = builder.Options;

            var dict = new Dictionary<string, string>
            {
                {"TokenValues:issuer", "http://editorial-api.spi-global.com"},
                {"TokenValues:audience", "http://editorial-ui.spi-global.com"},
                {"TokenValues:expiresInMinutes", "300"},
                {"TokenValues:key", "my-secret-key-to-use"},
                {"HumanReview:uri", "http://bgpc000032913:8089/api/auth/token"},
                {"WebApi:uri", "http://bgpc000032913:8083"}
            };
            var confbuilder = new ConfigurationBuilder();
            confbuilder.AddInMemoryCollection(dict);
            _configuration = confbuilder.Build();

            PopulatePages();
        }

        /*
        [Fact]
        */
        public async System.Threading.Tasks.Task PagesAsync()
        {
            var helper = new TestHelpers();
            TokenData apitokendata = helper.GetToken();

            string hruri = _configuration.GetSection("WebApi:uri").Value + "/api/page";
            Uri uri = new Uri(hruri);
            HttpResponseMessage response;
            HttpClient client;

            using (client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization =
                        new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", apitokendata.token.ToString());

                response = await client.GetAsync(uri);
                
                // Get All pages
                Assert.NotNull(response);
                Assert.Equal(HttpStatusCode.OK, response.StatusCode);

               
                hruri = _configuration.GetSection("WebApi:uri").Value + "/api/page/1";
                uri = new Uri(hruri);
                response = await client.GetAsync(uri);

                // Get single page
                Assert.NotNull(response);
                Assert.Equal(HttpStatusCode.OK, response.StatusCode);

            }
           

        }

        public void PopulatePages()
        {
            using (var context = new AppDbContext(options, null))
            {
                var pg = new Models.Admin.Page.Pages { PagesID = 1, PageName = "test", PagesDescription = "test page" };

                context.Pages.Add(pg);
                context.SaveChanges();
            }
        }
        
    }
}

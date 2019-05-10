using System;
using System.Collections.Generic;
using System.Linq;
using LNWCOE.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Xunit;
using LNWCOE.Models.News;
using LNWCOE.Modules.NEWS;
using Microsoft.AspNetCore.Mvc;
using LNWCOE.Models.Admin;
using Newtonsoft.Json.Linq;

namespace LNWCOE.Tests.UnitTests
{
    public class NewsTests : TestBase, IDisposable
    {



        private DbContextOptions<AppDbContext> options;
        private IConfiguration _configuration;
        private DbContextOptions<NEWSDBContext> newsoptions;

        public NewsTests()
        {
            _configuration = conf;
            options = opt;
            newsoptions = optnews;
            PopulateData();
            
        }

        [Fact]
        public void NewsStatus()
        {
            using (var context = new AppDbContext(options, null))
            {
                var controller = new NewsStatusController(context, null);

                // Get all
                var result = controller.Get();
                // Assert
                var okResult = Assert.IsAssignableFrom<IEnumerable<NewsStatus>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);

                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<NewsStatus>(result1);
                Assert.Equal("NewsStatus 1", result1.NewsStatusDescription);

                // test update 
                var pg1 = new NewsStatus { NewsStatusID = 1, NewsStatusValue = 1, NewsStatusDescription = "NewsStatus 1 upd" };
                controller.UpdateEntry(pg1);
                var result3 = controller.Get(1);
                Assert.NotEqual("NewsStatus 1", result3.NewsStatusDescription);

                Assert.Equal("NewsStatus 1 upd", result3.NewsStatusDescription);

                // test delete
                var result4 = controller.Get(2);
                Assert.Equal("NewsStatus 2", result4.NewsStatusDescription);

                IActionResult result5 = controller.Delete(2);
                var viewResult = Assert.IsType<OkResult>(result5);
                var result6 = controller.Get(2);
                Assert.Null(result6);
            }
        }

        [Fact]
        public void Feeder_watches()
        {
            using (var newscontext = new NEWSDBContext(newsoptions, null))
            using (var context = new AppDbContext(options, null))
            {
                var controller = new Feeder_watchesController(newscontext, context, null);

                // Get all
                var result = controller.Get();
                // Assert
                var okResult = Assert.IsAssignableFrom<JsonResult>(result);

                dynamic jsonObj = Newtonsoft.Json.JsonConvert.DeserializeObject(okResult.ToString());
                jsonObj.Count();
                //JArray items = (JArray)result;

                //var pgcount = items.Count();
                //Assert.Equal(2, pgcount);

            }
        }

        internal void PopulateData()
        {
            using (var context = new AppDbContext(options, null))
            {
                if (context.NewsStatus.Count() < 1)
                {
                    var p1 = new NewsStatus { NewsStatusID = 1, NewsStatusValue = 1, NewsStatusDescription = "NewsStatus 1", };
                    var p2 = new NewsStatus { NewsStatusID = 2, NewsStatusValue = 2, NewsStatusDescription = "NewsStatus 2", };
                    context.NewsStatus.Add(p1);
                    context.NewsStatus.Add(p2);
                }

                if (context.LanguageType.Count() < 1)
                {
                    var p1 = new LanguageType { LanguageTypeID = 1, LanguageTypeName = "LanguageType 1" };
                    var p2 = new LanguageType { LanguageTypeID = 2, LanguageTypeName = "LanguageType 2" };
                    context.LanguageType.Add(p1);
                    context.LanguageType.Add(p2);
                }

                context.SaveChanges();
            }

            using (var newscontext = new NEWSDBContext(newsoptions, null))
            using (var context = new AppDbContext(options, null))
            {
                if (newscontext.Feeder_Watches.Count() < 1)
                {
                    var p1 = new Feeder_watches { pkWatchID = 1, Caption = "Feeder_watches 1", fkLanguageID = 1 };
                    var p2 = new Feeder_watches { pkWatchID = 2, Caption = "Feeder_watches 2", fkLanguageID = 2 };
                    newscontext.Feeder_Watches.Add(p1);
                    newscontext.Feeder_Watches.Add(p2);
                    
                }

                newscontext.SaveChanges();
            }

            
        }
        public void Dispose()
        {
            //throw new NotImplementedException();
        }
    }
}

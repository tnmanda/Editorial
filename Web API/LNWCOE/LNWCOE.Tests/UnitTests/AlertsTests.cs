using System;
using System.Collections.Generic;
using System.Linq;
using LNWCOE.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Xunit;
using LNWCOE.Helpers.ALERTS;
using LNWCOE.Models.ALERTS;
using LNWCOE.Modules.ALERTS;
using Microsoft.AspNetCore.Mvc;

namespace LNWCOE.Tests.UnitTests
{
    public class AlertsTests : TestBase, IDisposable
    {
        private DbContextOptions<AppDbContext> options;
        private IConfiguration _configuration;

        public AlertsTests()
        {
            _configuration = conf;
            options = opt;
            PopulateData();
        }

        [Fact]
        public void AlertJobs()
        {
            using (var context = new AppDbContext(options, null))
            {
                var controller = new AlertJobsController(context, null, null);

                // Get all
                var result = controller.Get();
                // Assert
                var okResult = Assert.IsAssignableFrom<List<AlertJobs>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);
            }
        }

        [Fact]
        public void AlertNames()
        {
            using (var context = new AppDbContext(options, null))
            {
                var controller = new AlertNamesController(context, null);

                // Get all
                var result = controller.Get();
                // Assert
                var okResult = Assert.IsAssignableFrom<List<AlertNames>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);
            }
        }

        [Fact]
        public void AlertJobsQueue()
        {
            using (var context = new AppDbContext(options, null))
            {
                var controller = new AlertJobsQueueController(context, null, null);

                // Get all
                var result = controller.Get();
                // Assert
                var okResult = Assert.IsAssignableFrom<List<AlertJobsQueue>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);

                IActionResult result1 = controller.Delete(2);
                result = controller.Get();
                pgcount = result.ToList().Count;
                Assert.Equal(1, pgcount);

                result1 = controller.CloseAlertBatch(1);
                var result2 = controller.Get(1);
                Assert.Equal(1048, result2.StatusCollectionItemID);

            }
            
        }

        internal void PopulateData()
        {
            using (var context = new AppDbContext(options, null))
            {
                if (context.AlertJobs.Count() < 1)
                {
                    var p1 = new AlertJobs { AlertJobsID = 1, JobName = "AlertJobs 1" };
                    var p2 = new AlertJobs { AlertJobsID = 2, JobName = "AlertJobs 2" };
                    context.AlertJobs.Add(p1);
                    context.AlertJobs.Add(p2);

                    context.SaveChanges();
                }

                if (context.AlertNames.Count() < 1)
                {
                    var p1 = new AlertNames { AlertNameID = 1, NameEntry = "AlertNames 1", AlertJobsID = 1 };
                    var p2 = new AlertNames { AlertNameID = 2, NameEntry = "AlertNames 2", AlertJobsID = 2 };
                    context.AlertNames.Add(p1);
                    context.AlertNames.Add(p2);

                    context.SaveChanges();
                }

                if (context.AlertJobsQueue.Count() < 1)
                {
                    var p1 = new AlertJobsQueue { AlertJobsQueueID = 1, CreatedBy = "6", StatusCollectionItemID = 1047 };
                    var p2 = new AlertJobsQueue { AlertJobsQueueID = 2, CreatedBy = "6", StatusCollectionItemID = 1047 };
                    context.AlertJobsQueue.Add(p1);
                    context.AlertJobsQueue.Add(p2);

                    context.SaveChanges();
                }
            }
        }

        public void Dispose()
        {
            //throw new NotImplementedException();
            //options
        }
    }
}

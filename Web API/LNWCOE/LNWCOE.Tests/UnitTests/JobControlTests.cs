using System;
using System.Collections.Generic;
using System.Linq;
using LNWCOE.Data;
using LNWCOE.Models.Admin;
using LNWCOE.Helpers.Admin;
using LNWCOE.Models.ALERTS;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Xunit;
using LNWCOE.Helpers.ALERTS;

namespace LNWCOE.Tests.UnitTests
{
    public class JobControlTests : TestBase, IDisposable
    {
        private DbContextOptions<AppDbContext> options;
        private IConfiguration _configuration;

        public JobControlTests()
        {
            _configuration = conf;
            options = opt;
            PopulateData();
        }

        [Fact]
        public void AlertJobs()
        {
            ILogger<AlertJobsController> _testlogger = null;

            using (var context = new AppDbContext(options, null))
            {
                var controller = new AlertJobsController(context, _testlogger, null);
                // Get all
                var result = controller.Get();
                // Assert
                var okResult = Assert.IsAssignableFrom<IEnumerable<AlertJobs>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);
                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<AlertJobs>(result1);
                Assert.Equal("user1", okResult1.CreatedBy);
                // test update 
                var pg1 = new AlertJobs { AlertJobsID = 1, CreatedBy = "user1 upd" };
                controller.UpdateEntry(pg1);
                var result3 = controller.Get(1);
                Assert.NotEqual("user1", result3.CreatedBy);
                Assert.Equal("user1 upd", result3.CreatedBy);
                // test delete
                var result4 = controller.Get(2);
                Assert.Equal("user1", result4.CreatedBy);

                var result5 = controller.Delete(2);
                var viewResult = Assert.IsType<Microsoft.AspNetCore.Mvc.OkResult>(result5);
                var result6 = controller.Get(2);
                Assert.Null(result6);
            }
        }

        [Fact]
        public void AlertSchedules()
        {
            ILogger<AlertSchedulesController> _testlogger = null;

            using (var context = new AppDbContext(options, null))
            {
                var controller = new AlertSchedulesController(context, _testlogger);
                // Get all
                var result = controller.Get();
                // Assert
                var okResult = Assert.IsAssignableFrom<IEnumerable<AlertSchedules>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);
                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<AlertSchedules>(result1);
                Assert.Equal("user1", okResult1.CreatedBy);
                // test update 
                var pg1 = new AlertSchedules { AlertSchedulesId = 1, CreatedBy = "user1 upd" };
                controller.UpdateEntry(pg1);
                var result3 = controller.Get(1);
                Assert.NotEqual("user1", result3.CreatedBy);
                Assert.Equal("user1 upd", result3.CreatedBy);
                // test delete
                var result4 = controller.Get(2);
                Assert.Equal("user1", result4.CreatedBy);

                var result5 = controller.Delete(2);
                var viewResult = Assert.IsType<Microsoft.AspNetCore.Mvc.OkResult>(result5);
                var result6 = controller.Get(2);
                Assert.Null(result6);
            }
        }

        [Fact]
        public void AlertScheduleType()
        {
            ILogger<AlertScheduleTypeController> _testlogger = null;

            using (var context = new AppDbContext(options, null))
            {
                var controller = new AlertScheduleTypeController(context, _testlogger);
                // Get all
                var result = controller.Get();
                // Assert
                var okResult = Assert.IsAssignableFrom<IEnumerable<AlertScheduleType>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);
                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<AlertScheduleType>(result1);
                Assert.Equal("user1", okResult1.CreatedBy);
                // test update 
                var pg1 = new AlertScheduleType { AlertScheduleTypeID = 1, CreatedBy = "user1 upd" };
                controller.UpdateEntry(pg1);
                var result3 = controller.Get(1);
                Assert.NotEqual("user1", result3.CreatedBy);
                Assert.Equal("user1 upd", result3.CreatedBy);
                // test delete
                var result4 = controller.Get(2);
                Assert.Equal("user1", result4.CreatedBy);

                var result5 = controller.Delete(2);
                var viewResult = Assert.IsType<Microsoft.AspNetCore.Mvc.OkResult>(result5);
                var result6 = controller.Get(2);
                Assert.Null(result6);
            }

        }

        [Fact]
        public void AlertSourceType()
        {
            ILogger<AlertSourceTypeController> _testlogger = null;

            using (var context = new AppDbContext(options, null))
            {
                var controller = new AlertSourceTypeController(context, _testlogger);
                // Get all
                var result = controller.Get();
                // Assert
                var okResult = Assert.IsAssignableFrom<IEnumerable<AlertSourceType>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);
                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<AlertSourceType>(result1);
                Assert.Equal("user1", okResult1.CreatedBy);
                // test update 
                var pg1 = new AlertSourceType { AlertSourceTypeID = 1, CreatedBy = "user1 upd" };
                controller.UpdateEntry(pg1);
                var result3 = controller.Get(1);
                Assert.NotEqual("user1", result3.CreatedBy);
                Assert.Equal("user1 upd", result3.CreatedBy);
                // test delete
                var result4 = controller.Get(2);
                Assert.Equal("user1", result4.CreatedBy);

                var result5 = controller.Delete(2);
                var viewResult = Assert.IsType<Microsoft.AspNetCore.Mvc.OkResult>(result5);
                var result6 = controller.Get(2);
                Assert.Null(result6);
            }
        }

        [Fact]
        public void AlertWorkers()
        {
            ILogger<AlertWorkersController> _testlogger = null;

            using (var context = new AppDbContext(options, null))
            {
                var controller = new AlertWorkersController(context, _testlogger);
                // Get all
                var result = controller.Get();
                // Assert
                var okResult = Assert.IsAssignableFrom<IEnumerable<AlertWorkers>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);
                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<AlertWorkers>(result1);
                Assert.Equal("user1", okResult1.CreatedBy);
                // test update 
                var pg1 = new AlertWorkers { AlertWorkersID = 1, CreatedBy = "user1 upd" };
                controller.UpdateEntry(pg1);
                var result3 = controller.Get(1);
                Assert.NotEqual("user1", result3.CreatedBy);
                Assert.Equal("user1 upd", result3.CreatedBy);
                // test delete
                var result4 = controller.Get(2);
                Assert.Equal("user1", result4.CreatedBy);

                var result5 = controller.Delete(2);
                var viewResult = Assert.IsType<Microsoft.AspNetCore.Mvc.OkResult>(result5);
                var result6 = controller.Get(2);
                Assert.Null(result6);
            }
        }

        [Fact]
        public void Encoding()
        {
            ILogger<EncodingController> _testlogger = null;

            using (var context = new AppDbContext(options, null))
            {
                var controller = new EncodingController(context, _testlogger);
                // Get all
                var result = controller.Get();
                // Assert
                var okResult = Assert.IsAssignableFrom<IEnumerable<Encoding>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);
                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<Encoding>(result1);
                Assert.Equal("user1", okResult1.CreatedBy);
                // test update 
                var pg1 = new Encoding { EncodingID = 1, CreatedBy = "user1 upd" };
                controller.UpdateEntry(pg1);
                var result3 = controller.Get(1);
                Assert.NotEqual("user1", result3.CreatedBy);
                Assert.Equal("user1 upd", result3.CreatedBy);
                // test delete
                var result4 = controller.Get(2);
                Assert.Equal("user1", result4.CreatedBy);

                var result5 = controller.Delete(2);
                var viewResult = Assert.IsType<Microsoft.AspNetCore.Mvc.OkResult>(result5);
                var result6 = controller.Get(2);
                Assert.Null(result6);
            }
        }
        

        internal void PopulateData()
        {
            using (var context = new AppDbContext(options, null))
            {
                if (context.AlertJobs.Count() < 1)
                {
                    var p1 = new AlertJobs { AlertJobsID = 1, CreatedBy = "user1", };
                    var p2 = new AlertJobs { AlertJobsID = 2, CreatedBy = "user1", };
                    context.AlertJobs.Add(p1);
                    context.AlertJobs.Add(p2);

                    context.SaveChanges();
                }

                if (context.AlertSchedules.Count() < 1)
                {
                    var p1 = new AlertSchedules { AlertSchedulesId = 1, CreatedBy = "user1", };
                    var p2 = new AlertSchedules { AlertSchedulesId = 2, CreatedBy = "user1", };
                    context.AlertSchedules.Add(p1);
                    context.AlertSchedules.Add(p2);

                    context.SaveChanges();
                }

                if (context.AlertScheduleType.Count() < 1)
                {
                    var p1 = new AlertScheduleType { AlertScheduleTypeID = 1, CreatedBy = "user1", };
                    var p2 = new AlertScheduleType { AlertScheduleTypeID = 2, CreatedBy = "user1", };
                    context.AlertScheduleType.Add(p1);
                    context.AlertScheduleType.Add(p2);

                    context.SaveChanges();
                }

                if (context.AlertSourceType.Count() < 1)
                {
                    var p1 = new AlertSourceType { AlertSourceTypeID = 1, CreatedBy = "user1", };
                    var p2 = new AlertSourceType { AlertSourceTypeID = 2, CreatedBy = "user1", };
                    context.AlertSourceType.Add(p1);
                    context.AlertSourceType.Add(p2);

                    context.SaveChanges();
                }

                if (context.AlertWorkers.Count() < 1)
                {
                    var p1 = new AlertWorkers { AlertWorkersID = 1, CreatedBy = "user1", };
                    var p2 = new AlertWorkers { AlertWorkersID = 2, CreatedBy = "user1", };
                    context.AlertWorkers.Add(p1);
                    context.AlertWorkers.Add(p2);

                    context.SaveChanges();
                }

                if (context.Encoding.Count() < 1)
                {
                    var p1 = new Encoding { EncodingID = 1, CreatedBy = "user1", };
                    var p2 = new Encoding { EncodingID = 2, CreatedBy = "user1", };
                    context.Encoding.Add(p1);
                    context.Encoding.Add(p2);

                    context.SaveChanges();
                }

                

            }
        }

        public void Dispose()
        {
            //throw new NotImplementedException();
        }

    }
}

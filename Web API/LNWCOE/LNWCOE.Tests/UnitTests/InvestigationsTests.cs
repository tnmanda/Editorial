using System;
using System.Collections.Generic;
using System.Linq;
using LNWCOE.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Xunit;
using LNWCOE.Modules.INV;
using LNWCOE.Models.INV;
using Microsoft.AspNetCore.Mvc;

namespace LNWCOE.Tests.UnitTests
{
    public class InvestigationsTests : TestBase, IDisposable
    {
        private DbContextOptions<AppDbContext> options;
        private IConfiguration _configuration;

        public InvestigationsTests()
        {
            _configuration = conf;
            options = opt;
            PopulateData();
        }

        [Fact]
        public void ActivityTypes()
        {
            using (var context = new AppDbContext(options, null))
            {
                var controller = new ActivityTypeController(context);

                // Get all
                var result = controller.Get();
                // Assert
                var okResult = Assert.IsAssignableFrom<List<ActivityType>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);

                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<ActivityType>(result1);
                //var thisresult1 = okResult1.FirstOrDefault();
                Assert.Equal("activity type 1", result1.ActivityTypeName);

                // test update 
                var pg1 = new ActivityType { ActivityTypeID = 1, ActivityTypeName = "activity type 1 upd" };
                controller.UpdateEntry(pg1);
                var result3 = controller.Get(1);
                //var thisresult3 = result3.FirstOrDefault();
                Assert.NotEqual("activity type 1", result3.ActivityTypeName);
                Assert.Equal("activity type 1 upd", result3.ActivityTypeName);

                // test delete
                var result4 = controller.Get(2);
                //var thisresult4 = result4.FirstOrDefault();
                Assert.Equal("activity type 2", result4.ActivityTypeName);

                IActionResult result5 = controller.Delete(2);
                var viewResult = Assert.IsType<Microsoft.AspNetCore.Mvc.OkResult>(result5);
                var result6 = controller.Get(2);
                Assert.Null(result6);

            }
        }

        [Fact]
        public void InvestigationNote()
        {
            using (var context = new AppDbContext(options, null))
            {

                var controller = new InvestigationNoteController(context);

                // Get all
                var result = controller.Get();
                // Assert
                var okResult = Assert.IsAssignableFrom<IEnumerable<InvestigationNote>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);

                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<InvestigationNote>(result1);
                //var thisresult1 = okResult1.FirstOrDefault();
                Assert.Equal("InvestigationNote 1", result1.NoteText);

                // test update 
                var pg1 = new InvestigationNote { InvestigationNoteID = 1, NoteText = "InvestigationNote 1 upd" };
                controller.UpdateEntry(pg1);
                var result3 = controller.Get(1);
                //var thisresult3 = result3.FirstOrDefault();
                Assert.NotEqual("InvestigationNote 1", result3.NoteText);

                Assert.Equal("InvestigationNote 1 upd", result3.NoteText);

                // test delete
                var result4 = controller.Get(2);
                Assert.Equal("InvestigationNote 2", result4.NoteText);

                IActionResult result5 = controller.Delete(2);
                var viewResult = Assert.IsType<Microsoft.AspNetCore.Mvc.OkResult>(result5);
                var result6 = controller.Get(2);
                Assert.Null(result6);
            }
        }

        [Fact]
        public void InvestigationStatus ()
        {
            using (var context = new AppDbContext(options, null))
            {
                var controller = new InvestigationStatusController(context);

                // Get all
                var result = controller.Get();
                // Assert
                var okResult = Assert.IsAssignableFrom<IEnumerable<InvestigationStatus>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);

                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<InvestigationStatus>(result1);
                Assert.Equal("InvestigationStatus 1", result1.InvestigationStatusDescription);

                // test update 
                var pg1 = new InvestigationStatus { InvestigationStatusID = 1, InvestigationStatusDescription = "InvestigationStatus 1 upd" };
                controller.UpdateEntry(pg1);
                var result3 = controller.Get(1);
                Assert.NotEqual("InvestigationStatus 1", result3.InvestigationStatusDescription);

                Assert.Equal("InvestigationStatus 1 upd", result3.InvestigationStatusDescription);

                // test delete
                var result4 = controller.Get(2);
                Assert.Equal("InvestigationStatus 2", result4.InvestigationStatusDescription);

                IActionResult result5 = controller.Delete(2);
                var viewResult = Assert.IsType<OkResult>(result5);
                var result6 = controller.Get(2);
                Assert.Null(result6);
            }
        }

        [Fact]
        public void InvestigationActivity()
        {
            using (var context = new AppDbContext(options, null))
            {
                var controller = new InvestigationActivityController(context);

                // Get all
                var result = controller.Get();
                // Assert
                var okResult = Assert.IsAssignableFrom<IEnumerable<InvestigationActivity>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);

                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<InvestigationActivity>(result1);
                Assert.Equal("InvestigationActivity 1", result1.FromValue);

                // test update 
                var pg1 = new InvestigationActivity { InvestigationActivityID = 1, FromValue = "InvestigationActivity 1 upd" };
                controller.UpdateEntry(pg1);
                var result3 = controller.Get(1);
                Assert.NotEqual("InvestigationActivity 1", result3.FromValue);

                Assert.Equal("InvestigationActivity 1 upd", result3.FromValue);

                // test delete
                var result4 = controller.Get(2);
                Assert.Equal("InvestigationActivity 2", result4.FromValue);

                IActionResult result5 = controller.Delete(2);
                var viewResult = Assert.IsType<OkResult>(result5);
                var result6 = controller.Get(2);
                Assert.Null(result6);
            }
        }

        internal void PopulateData()
        {
            using (var context = new AppDbContext(options, null))
            {
                if (context.ActivityType.Count() < 1)
                {
                    var p1 = new ActivityType {  ActivityTypeID = 1, ActivityTypeName = "activity type 1", };
                    var p2 = new ActivityType { ActivityTypeID = 2, ActivityTypeName = "activity type 2", };
                    context.ActivityType.Add(p1);
                    context.ActivityType.Add(p2);

                    context.SaveChanges();
                }

                if (context.InvestigationNote.Count() < 1)
                {
                    var p1 = new InvestigationNote { InvestigationNoteID = 1, NoteText = "InvestigationNote 1", };
                    var p2 = new InvestigationNote { InvestigationNoteID = 2, NoteText = "InvestigationNote 2", };
                    context.InvestigationNote.Add(p1);
                    context.InvestigationNote.Add(p2);

                    context.SaveChanges();
                }

                if (context.InvestigationStatus.Count() < 1)
                {
                    var p1 = new InvestigationStatus { InvestigationStatusID = 1, InvestigationStatusDescription = "InvestigationStatus 1", };
                    var p2 = new InvestigationStatus { InvestigationStatusID = 2, InvestigationStatusDescription = "InvestigationStatus 2", };
                    context.InvestigationStatus.Add(p1);
                    context.InvestigationStatus.Add(p2);

                    context.SaveChanges();
                }

                if (context.InvestigationActivity.Count() < 1)
                {
                    var p1 = new InvestigationActivity { InvestigationActivityID = 1, FromValue = "InvestigationActivity 1", };
                    var p2 = new InvestigationActivity { InvestigationActivityID = 2, FromValue = "InvestigationActivity 2", };
                    context.InvestigationActivity.Add(p1);
                    context.InvestigationActivity.Add(p2);

                    context.SaveChanges();
                }
                
            }
        }

        public void Dispose()
        {
            ;
            //throw new NotImplementedException();
        }
    }
}
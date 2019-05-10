using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LNWCOE.Data;
using LNWCOE.Models.Admin;
using LNWCOE.Helpers.Admin;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Xunit;

namespace LNWCOE.Tests.UnitTests
{
    public class TypeTablesTests : TestBase, IDisposable
    {
        private DbContextOptions<AppDbContext> options;
        private IConfiguration _configuration;

        public TypeTablesTests()
        {
            _configuration = conf;
            options = opt;
            PopulateData();
        }

        [Fact]
        public void Teams()
        {
            ILogger<TeamController> _testlogger = null;

            using (var context = new AppDbContext(options, null))
            {
                var controller = new TeamController(context, _testlogger);

                // Get all
                var result = controller.Get();

                // Assert
                var okResult = Assert.IsAssignableFrom<IEnumerable<Team>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);

                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<Team>(result1);
                Assert.Equal("team 1", okResult1.TeamName);

                // test update 
                var pg1 = new Team { TeamID = 1, TeamName = "team 1 upd" };
                controller.UpdateEntry(pg1);
                var result3 = controller.Get(1);
                Assert.NotEqual("team 1", result3.TeamName);
                Assert.Equal("team 1 upd", result3.TeamName);

                // test delete
                var result4 = controller.Get(2);
                Assert.Equal("team 2", result4.TeamName);

                IActionResult result5 = controller.Delete(2);
                var viewResult = Assert.IsType<Microsoft.AspNetCore.Mvc.OkResult>(result5);
                var result6 = controller.Get(2);
                Assert.Null(result6);


            }
        }

        [Fact]
        public void Offices()
        {
            ILogger<OfficeController> _testlogger = null;

            using (var context = new AppDbContext(options, null))
            {
                var controller = new OfficeController(context, _testlogger);

                // Get all
                var result = controller.Get();

                // Assert
                var okResult = Assert.IsAssignableFrom<IEnumerable<Office>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);

                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<Microsoft.AspNetCore.Mvc.JsonResult>(result1);
                //var offceresult = JsonConvert.DeserializeObject<Office>(okResult1.ToString());
                //Assert.Equal("office 1", offceresult.OfficeName);

                // test update 
                var pg1 = new Office { OfficeID = 1, OfficeName = "office 1 upd" };
                controller.UpdateEntry(pg1);
                var result3 = controller.Get(1);
                //Assert.NotEqual("team 1", result3.name);
                //Assert.Equal("team 1 upd", result3.TeamName);

                // test delete
                var result4 = controller.Get(2);
                //Assert.Equal("team 2", result4.name);

                IActionResult result5 = controller.Delete(2);
                var viewResult = Assert.IsType<Microsoft.AspNetCore.Mvc.OkResult>(result5);
                //var result6 = controller.Get(2);
                //Assert.Null(result6);
            }

        }

        [Fact]
        public void Contries()
        {
            ILogger<CountryController> _testlogger = null;

            using (var context = new AppDbContext(options, null))
            {
                var controller = new CountryController(context, _testlogger);

                // Get all
                var result = controller.Get();

                // Assert
                var okResult = Assert.IsAssignableFrom<IEnumerable<Country>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);

                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<Country>(result1);
                Assert.Equal("country 1", okResult1.CountryName);

                // test update 
                var pg1 = new Country { CountryID = 1, CountryName = "country 1 upd" };
                controller.UpdateEntry(pg1);
                var result3 = controller.Get(1);
                Assert.NotEqual("country 1", result3.CountryName);
                Assert.Equal("country 1 upd", result3.CountryName);

                // test delete
                var result4 = controller.Get(2);
                Assert.Equal("country 2", result4.CountryName);

                IActionResult result5 = controller.Delete(2);
                var viewResult = Assert.IsType<Microsoft.AspNetCore.Mvc.OkResult>(result5);
                var result6 = controller.Get(2);
                Assert.Null(result6);
            }
        }

        [Fact]
        public async System.Threading.Tasks.Task UsersAsync()
        {
            ILogger<AppUserController> _testlogger = null;

            using (var context = new AppDbContext(options, null))
            {
                var controller = new AppUserController(context, _testlogger);

                // Get all
                var result = controller.GetAsync();

                // Assert
                var okResult = await Assert.IsAssignableFrom<Task<IEnumerable<AppUser>>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.NotEmpty(okResult);
                Assert.Equal(2, pgcount);

                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<JsonResult>(result1);

                // test update 
                var pg1 = new AppUser { AppUserID = 1, AppUserName = "user 1 upd" };
                var result3 = controller.UpdateEntry(pg1);
                Assert.IsType<Microsoft.AspNetCore.Mvc.OkResult>(result3);

                //delete 1 user
                var result4 = controller.Delete(1);
                Assert.IsType<Microsoft.AspNetCore.Mvc.OkResult>(result4);
                var result5 = controller.Delete(2);
                Assert.IsType<Microsoft.AspNetCore.Mvc.OkResult>(result5);
                // Get all
                var result6 = await controller.GetAsync();
                pgcount = result6.ToList().Count;
                Assert.Equal(0, pgcount);

            }
        }

        public void Dispose()
        {
            //throw new NotImplementedException();
        }

        internal void PopulateData()
        {
            using (var context = new AppDbContext(options, null))
            {
                if (context.Team.Count() < 1)
                {
                    var p1 = new Team { TeamID = 1, TeamName = "team 1", };
                    var p2 = new Team { TeamID = 2, TeamName = "team 2", };
                    context.Team.Add(p1);
                    context.Team.Add(p2);

                    context.SaveChanges();
                }

                if (context.Office.Count() < 1)
                {
                    var p1 = new Office { OfficeID = 1, OfficeName = "office 1", };
                    var p2 = new Office { OfficeID = 2, OfficeName = "office 2", };
                    context.Office.Add(p1);
                    context.Office.Add(p2);

                    context.SaveChanges();
                }

                if (context.Country.Count() < 1)
                {
                    var p1 = new Country { CountryID = 1, CountryName = "country 1", };
                    var p2 = new Country { CountryID = 2, CountryName = "country 2", };
                    context.Country.Add(p1);
                    context.Country.Add(p2);

                    context.SaveChanges();
                }

                if (context.AppUser.Count() < 1)
                {
                    var p1 = new AppUser { AppUserID = 1, AppUserName = "user 1", };
                    var p2 = new AppUser { AppUserID = 2, AppUserName = "user 2", };
                    context.AppUser.Add(p1);
                    context.AppUser.Add(p2);

                    context.SaveChanges();
                }
            }
        }

    }
}

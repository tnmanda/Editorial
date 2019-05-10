using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using LNWCOE.Data;
using LNWCOE.Models.Admin.Page;
using LNWCOE.Helpers.Admin.Pages;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Xunit;
using LNWCOE.Models.Admin;

namespace LNWCOE.Tests.UnitTests
{
    public class PageRelatedTests : TestBase, IDisposable
    {
        private DbContextOptions<AppDbContext> options;
        private IConfiguration _configuration;


        public PageRelatedTests()
        {
            _configuration = conf;
            options = opt;
            PopulateData();
        }

        public void Dispose()
        {
            ;
            //throw new NotImplementedException();
        }

        [Fact]
        public void Pages()
        {
            ILogger<PageController> _testlogger = null;

            using (var context = new AppDbContext(options, null))
            {
                PageController controller = new PageController(context, _testlogger);

                // Get all
                var result = controller.Get();

                // Assert
                var okResult = Assert.IsAssignableFrom<IEnumerable<Models.Admin.Page.Pages>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);

                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<Models.Admin.Page.Pages>(result1);
                Assert.Equal("test page 1", okResult1.PageName);

                // test update 
                var pg1 = new Models.Admin.Page.Pages { PagesID = 1, PageName = "page 1 name", PagesDescription = "test page 1" };
                controller.UpdateEntry(pg1);
                var result3 = controller.Get(1);
                Assert.NotEqual("test page 1", result3.PageName);
                Assert.Equal("page 1 name", result3.PageName);

                // test delete
                var result4 = controller.Get(2);
                Assert.Equal("test page 2", result4.PageName);

                IActionResult result5 = controller.Delete(2);
                var viewResult = Assert.IsType<Microsoft.AspNetCore.Mvc.OkResult>(result5);
                var result6 = controller.Get(2);
                Assert.Null(result6);
            }

        }

        [Fact]
        public void PagesGroups() // PagesGroupsController
        {
            ILogger<PagesGroupsController> _testlogger = null;

            using (var context = new AppDbContext(options, null))
            {
                var controller = new PagesGroupsController(context, _testlogger);

                // Get all
                var result = controller.Get();

                // Assert
                var okResult = Assert.IsAssignableFrom<IEnumerable<PagesGroups>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);

                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<PagesGroups>(result1);
                Assert.Equal("test page group 1", okResult1.PagesGroupsName);

                // test update 
                var pg1 = new PagesGroups { PagesGroupsID = 1, PagesGroupsName = "test page group 1 upd", PagesGroupsDescription = "test page group 1" };
                controller.UpdateEntry(pg1);
                var result3 = controller.Get(1);
                //Assert.NotEqual("test page group 1", result3.PagesGroupsName);
                Assert.Equal("test page group 1 upd", result3.PagesGroupsName);

                // test delete
                var result4 = controller.Get(2);
                Assert.Equal("test page group 2", result4.PagesGroupsName);

                IActionResult result5 = controller.Delete(2);
                var viewResult = Assert.IsType<OkResult>(result5);
                var result6 = controller.Get(2);
                Assert.Null(result6);
            }
        }

        [Fact]
        public void ParentGroup()
        {
            ILogger<ParentGroupController> _testlogger = null;

            using (var context = new AppDbContext(options, null))
            {
                var controller = new ParentGroupController(context, _testlogger);

                // Get all
                var result = controller.Get();

                // Assert
                var okResult = Assert.IsAssignableFrom<IEnumerable<ParentGroup>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);

                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<ParentGroup>(result1);
                Assert.Equal("parent group 1", okResult1.ParentGroupName);

                // test update 
                var parentgrp1 = new ParentGroup { ParentGroupID = 1, ParentGroupName = "parent group 1 upd" };
                controller.UpdateEntry(parentgrp1);
                var result3 = controller.Get(1);
                Assert.Equal("parent group 1 upd", result3.ParentGroupName);

                // test delete
                var result4 = controller.Get(2);
                Assert.Equal("parent group 2", result4.ParentGroupName);

                IActionResult result5 = controller.Delete(2);
                var viewResult = Assert.IsType<OkResult>(result5);
                var result6 = controller.Get(2);
                Assert.Null(result6);

            }
        }

        [Fact]
        public void PageInUserRole()
        {
            ILogger<PageInUserRoleController> _testlogger = null;

            using (var context = new AppDbContext(options, null))
            {
                var controller = new PageInUserRoleController(context, _testlogger);

                // Get all
                var result = controller.Get();

                // Assert
                var okResult = Assert.IsAssignableFrom<IEnumerable<PageInUserRole>>(result);
                var pgcount = okResult.ToList().Count;
                Assert.Equal(2, pgcount);

                // Get by ID
                var result1 = controller.Get(1);
                var okResult1 = Assert.IsAssignableFrom<PageInUserRole>(result1);
                Assert.Equal("666", okResult1.CreatedBy);

                
                // test update 
                var pg = new PageInUserRole { PageInUserRoleID = 1, PagesID = 1, RoleTypeID = 1, CreatedBy = "666" };
                controller.UpdateEntry(pg);
                var result3 = controller.Get(1);
                Assert.Equal("666", result3.CreatedBy);

                // test delete
                var result4 = controller.Get(2);
                Assert.Equal("666", result4.CreatedBy);

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
                if (context.Pages.Count() < 1)
                {
                    var p1 = new Models.Admin.Page.Pages { PagesID = 1, PageName = "test page 1", PagesDescription = "test page 1" };
                    var p2 = new Models.Admin.Page.Pages { PagesID = 2, PageName = "test page 2", PagesDescription = "test page 2" };
                    context.Pages.Add(p1);
                    context.Pages.Add(p2);

                    context.SaveChanges();
                }

                if (context.PagesGroups.Count() < 1)
                {
                    var pg1 = new PagesGroups { PagesGroupsID = 1, PagesGroupsName = "test page group 1", PagesGroupsDescription = "test page group 1" };
                    var pg2 = new PagesGroups { PagesGroupsID = 2, PagesGroupsName = "test page group 2", PagesGroupsDescription = "test page group 2" };
                    context.PagesGroups.Add(pg1);
                    context.PagesGroups.Add(pg2);

                    context.SaveChanges();
                }

                if (context.ParentGroup.Count() < 1)
                {
                    var parentg1 = new ParentGroup { ParentGroupID = 1, ParentGroupName = "parent group 1" };
                    var parentg2 = new ParentGroup { ParentGroupID = 2, ParentGroupName = "parent group 2" };
                    context.ParentGroup.Add(parentg1);
                    context.ParentGroup.Add(parentg2);

                    context.SaveChanges();
                }

                if (context.PageInUserRole.Count() < 1)
                {
                    
                    var pg1 = new PageInUserRole { PageInUserRoleID = 1,  PagesID = 1, RoleTypeID = 1, CreatedBy = "666" };
                    var pg2 = new PageInUserRole { PageInUserRoleID = 2, PagesID = 1, RoleTypeID = 1, CreatedBy = "666" };
                    context.PageInUserRole.Add(pg1);
                    context.PageInUserRole.Add(pg2);

                    if (context.Pages.Count() < 1)
                    {
                        var p3 = new Models.Admin.Page.Pages { PagesID = 1, PageName = "test page 2", PagesDescription = "test page 2" };
                        context.Pages.Add(p3);
                    }

                    if (context.RoleType.Count() < 1)
                    {
                        var p4 = new RoleType { RoleTypeID = 1, RoleTypeName = "test role" };
                        context.RoleType.Add(p4);
                    }

                    context.SaveChanges();
                }
            }
        }

    }
}
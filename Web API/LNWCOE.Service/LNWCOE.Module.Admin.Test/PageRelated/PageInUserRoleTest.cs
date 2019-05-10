using System;
using System.Collections.Generic;
using System.Linq;
using LNWCOE.Models.Admin.Pages;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Admin.Test.PageRelated
{
    public class PageInUserRoleTest
    {
        [Fact]
        public void PageInUserRole()
        {
            PageInUserRole p = new PageInUserRole
            {
                PageInUserRoleID = 100,
                PagesID = 100,
                RoleTypeID = 100,
                CreatedBy = "111",
                UpdatedBy = "222",
                DateCreatedUTC = DateTime.UtcNow,
                LastUpdatedUTC = DateTime.UtcNow
            };

            IQueryable<PageInUserRole> PCollection = Enumerable.Empty<PageInUserRole>().AsQueryable();

            IEnumerable<PagesEx> PCollection2 = Enumerable.Empty<PagesEx>().AsEnumerable();

            var PageInUserRoleService = new Mock<IPageInUserRoleRepository>();

            try
            {
                PageInUserRoleService.Setup(x => x.GetAll()).Returns(PCollection);
                PageInUserRoleService.Setup(x => x.GetIdIncluding(It.IsAny<int>())).Returns(p);
                PageInUserRoleService.Setup(x => x.GetAllIncludingByName(It.IsAny<string>())).Returns(PCollection);
                PageInUserRoleService.Setup(x => x.Get(It.IsAny<int>())).Returns(p);
                PageInUserRoleService.Setup(x => x.Add(It.IsAny<PageInUserRole>())).Returns(p);
                PageInUserRoleService.Setup(x => x.GetAllByRole(It.IsAny<int>())).Returns(PCollection2);


                var PageInUserRoleServiceObject = PageInUserRoleService.Object;

                var p1 = PageInUserRoleServiceObject.GetAll();
                var p2 = PageInUserRoleServiceObject.GetIdIncluding(1);
                var p3 = PageInUserRoleServiceObject.GetAllIncludingByName("test");
                var p4 = PageInUserRoleServiceObject.Get(1);
                var p5 = PageInUserRoleServiceObject.GetAllByRole(1);

                Assert.IsAssignableFrom<IQueryable<PageInUserRole>>(p1);
                Assert.IsAssignableFrom<PageInUserRole>(p2);
                Assert.Equal("111", p2.CreatedBy);
                Assert.IsAssignableFrom<IQueryable<PageInUserRole>>(p3);
                Assert.Equal("222", p4.UpdatedBy);
                Assert.IsAssignableFrom<PageInUserRole>(p4);
                Assert.IsAssignableFrom<IEnumerable<PagesEx>>(p5);

                PageInUserRoleServiceObject.Dispose();
            }
            finally
            {
                PageInUserRoleService = null;
            }
        }
    }
}

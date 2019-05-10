using System.Linq;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Admin.Test.PageRelated
{
    public class PagesTest
    {
        [Fact]
        public void Pages()
        {
            Models.Admin.Pages.Pages p = new Models.Admin.Pages.Pages
            {
                PagesID = 1,
                IsActive = true,
                PageName = "Test Page"
            };

            IQueryable<Models.Admin.Pages.Pages> PageCollection = Enumerable.Empty<Models.Admin.Pages.Pages>().AsQueryable();

            Mock<IPageRepository> PageService = new Mock<IPageRepository>();

            try
            {
                PageService.Setup(x => x.GetAll()).Returns(PageCollection);
                PageService.Setup(x => x.GetIdIncluding(It.IsAny<int>())).Returns(p);
                PageService.Setup(x => x.GetAllIncludingByName(It.IsAny<string>())).Returns(PageCollection);
                PageService.Setup(x => x.Get(It.IsAny<int>())).Returns(p);
                PageService.Setup(x => x.Add(It.IsAny<Models.Admin.Pages.Pages>())).Returns(p);

                var thisObject = PageService.Object;
                var p1 = thisObject.GetAll();
                var p2 = thisObject.GetIdIncluding(1);
                var p3 = thisObject.GetAllIncludingByName("test");
                var p4 = thisObject.Get(1);
                var p5 = thisObject.Add(p);

                Assert.IsAssignableFrom<IQueryable<Models.Admin.Pages.Pages>>(p1);
                Assert.IsAssignableFrom<Models.Admin.Pages.Pages>(p2);
                Assert.Equal("Test Page", p2.PageName);
                Assert.IsAssignableFrom<IQueryable<Models.Admin.Pages.Pages>>(p3);
                Assert.Equal("Test Page", p4.PageName);
                Assert.IsAssignableFrom<Models.Admin.Pages.Pages>(p4);

                PageService.VerifyAll();

                thisObject.Dispose();
            }
            finally
            {
                PageService = null; 
            }

        }
    }
}

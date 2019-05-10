using System.Linq;
using LNWCOE.Models.Admin.Pages;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Admin.Test.PageRelated
{

    public class PagesGroupsTest
    {
        [Fact]
        public void PagesGroups()
        {
            IQueryable<PagesGroups> PagesGroupsCollection = Enumerable.Empty<PagesGroups>().AsQueryable();
            PagesGroups pg = new PagesGroups { PagesGroupsID = 1, ParentGroupID = 1, PagesGroupsName = "Test Parent Group" };

            Mock<IPagesGroupsRepository> PagesGroupsService = new Mock<IPagesGroupsRepository>();
            try
            {
                PagesGroupsService.Setup(x => x.GetAll()).Returns(PagesGroupsCollection);
                PagesGroupsService.Setup(x => x.GetIdIncluding(It.IsAny<int>())).Returns(pg);
                PagesGroupsService.Setup(x => x.GetAllIncludingByName(It.IsAny<string>())).Returns(PagesGroupsCollection);
                PagesGroupsService.Setup(x => x.Get(It.IsAny<int>())).Returns(pg);
                PagesGroupsService.Setup(x => x.Add(It.IsAny<PagesGroups>())).Returns(pg);

                var PagesGroupsObject = PagesGroupsService.Object;

                var p1 = PagesGroupsObject.GetAll();
                var p2 = PagesGroupsObject.GetIdIncluding(1);
                var p3 = PagesGroupsObject.GetAllIncludingByName("test");
                var p4 = PagesGroupsObject.Get(1);

                Assert.IsAssignableFrom<IQueryable<PagesGroups>>(p1);
                Assert.IsAssignableFrom<PagesGroups>(p2);
                Assert.Equal("Test Parent Group", p2.PagesGroupsName);
                Assert.IsAssignableFrom<IQueryable<PagesGroups>>(p3);
                Assert.Equal("Test Parent Group", p4.PagesGroupsName);
                Assert.IsAssignableFrom<PagesGroups>(p4);

                PagesGroupsObject.Dispose();
            }
            finally
            {
                PagesGroupsService = null;
            }
        }
    }
}

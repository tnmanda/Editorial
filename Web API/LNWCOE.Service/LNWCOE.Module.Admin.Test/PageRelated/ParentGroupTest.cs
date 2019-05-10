using System.Linq;
using LNWCOE.Models.Admin.Pages;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Admin.Test.PageRelated
{
    public class ParentGroupTest
    {
        [Fact]
        public void ParentGroup()
        {
            IQueryable<ParentGroup> ParentGroupCollection = Enumerable.Empty<ParentGroup>().AsQueryable();
            ParentGroup pg = new ParentGroup { ParentGroupID = 1, ParentGroupName = "Test PG" };

            Mock<IParentGroupRepository> ParentGroupService = new Mock<IParentGroupRepository>();

            try
            {
                ParentGroupService.Setup(x => x.GetAll()).Returns(ParentGroupCollection);
                ParentGroupService.Setup(x => x.Get(It.IsAny<int>())).Returns(pg);
                ParentGroupService.Setup(x => x.Add(It.IsAny<ParentGroup>())).Returns(pg);

                var ParentGroupObject = ParentGroupService.Object;
                var p1 = ParentGroupObject.GetAll();
                var p2 = ParentGroupObject.Get(1);

                Assert.IsAssignableFrom<IQueryable<ParentGroup>>(p1);
                Assert.IsAssignableFrom<ParentGroup>(p2);
                Assert.Equal("Test PG", p2.ParentGroupName);
                
                ParentGroupObject.Dispose();
            }
            finally
            {
                ParentGroupService = null;
            }
        }
    }
}

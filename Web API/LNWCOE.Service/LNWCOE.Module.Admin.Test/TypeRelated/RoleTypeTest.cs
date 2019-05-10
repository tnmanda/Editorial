using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Admin.Test.TypeRelated
{
    public class RoleTypeTest
    {
        [Fact]
        public void RoleType()
        {
            IQueryable<RoleType> RoleTypeCollection = Enumerable.Empty<RoleType>().AsQueryable();
            RoleType ct = new RoleType { RoleTypeID = 1, RoleTypeName = "Test RT" };

            Mock<IRoleTypeRepository> RoleTypeService = new Mock<IRoleTypeRepository>();

            object obj = new object();

            try
            {
                RoleTypeService.Setup(x => x.GetAll()).Returns(RoleTypeCollection);
                RoleTypeService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                RoleTypeService.Setup(x => x.Add(It.IsAny<RoleType>())).Returns(ct);
                RoleTypeService.Setup(x => x.Delete(It.IsAny<RoleType>())).Verifiable();
                RoleTypeService.Setup(x => x.Update(It.IsAny<RoleType>(), It.IsAny<object>())).Returns(ct);

                var RoleTypeObject = RoleTypeService.Object;
                var p1 = RoleTypeObject.GetAll();
                var p2 = RoleTypeObject.Get(1);
                var p3 = RoleTypeObject.Update(ct, obj);
                var p4 = RoleTypeObject.Add(ct);
                RoleTypeObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<RoleType>>(p1);
                Assert.IsAssignableFrom<RoleType>(p2);
                Assert.Equal("Test RT", p2.RoleTypeName );
                Assert.Equal("Test RT", p3.RoleTypeName);

                RoleTypeService.VerifyAll();

                RoleTypeObject.Dispose();
            }
            finally
            {
                RoleTypeService = null;
            }
        }
    }
}

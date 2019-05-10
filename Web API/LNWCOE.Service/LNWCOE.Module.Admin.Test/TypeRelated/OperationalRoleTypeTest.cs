using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Admin.Test.TypeRelated
{
    public class OperationalRoleTypeTest
    {
        [Fact]
        public void OperationalRoleType()
        {
            IQueryable<OperationalRoleType> OperationalRoleTypeCollection = Enumerable.Empty<OperationalRoleType>().AsQueryable();
            OperationalRoleType ct = new OperationalRoleType { OperationalRoleTypeID = 1, OperationalRoleName = "Test ORT" };

            Mock<IOperationalRoleTypeRepository> OperationalRoleTypeService = new Mock<IOperationalRoleTypeRepository>();

            object obj = new object();

            try
            {
                OperationalRoleTypeService.Setup(x => x.GetAll()).Returns(OperationalRoleTypeCollection);
                OperationalRoleTypeService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                OperationalRoleTypeService.Setup(x => x.Add(It.IsAny<OperationalRoleType>())).Returns(ct);
                OperationalRoleTypeService.Setup(x => x.Delete(It.IsAny<OperationalRoleType>())).Verifiable();
                OperationalRoleTypeService.Setup(x => x.Update(It.IsAny<OperationalRoleType>(), It.IsAny<object>())).Returns(ct);

                var OperationalRoleTypeObject = OperationalRoleTypeService.Object;
                var p1 = OperationalRoleTypeObject.GetAll();
                var p2 = OperationalRoleTypeObject.Get(1);
                var p3 = OperationalRoleTypeObject.Update(ct, obj);
                var p4 = OperationalRoleTypeObject.Add(ct);
                OperationalRoleTypeObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<OperationalRoleType>>(p1);
                Assert.IsAssignableFrom<OperationalRoleType>(p2);
                Assert.Equal("Test ORT", p2.OperationalRoleName);
                Assert.Equal("Test ORT", p3.OperationalRoleName);

                OperationalRoleTypeService.VerifyAll();

                OperationalRoleTypeObject.Dispose();
            }
            finally
            {
                OperationalRoleTypeService = null;
            }
        }
    }
}

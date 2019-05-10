using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Admin.Test.TypeRelated
{
    public class DepartureTypeTest
    {
        [Fact]
        public void DepartureType()
        {
            IQueryable<DepartureType> DepartureTypeCollection = Enumerable.Empty<DepartureType>().AsQueryable();
            DepartureType ct = new DepartureType { DepartureTypeID = 1, DepartureTypeName = "Test DT" };

            Mock<IDepartureTypeRepository> DepartureTypeService = new Mock<IDepartureTypeRepository>();

            object obj = new object();

            try
            {
                DepartureTypeService.Setup(x => x.GetAll()).Returns(DepartureTypeCollection);
                DepartureTypeService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                DepartureTypeService.Setup(x => x.Add(It.IsAny<DepartureType>())).Returns(ct);
                DepartureTypeService.Setup(x => x.Delete(It.IsAny<DepartureType>())).Verifiable();
                DepartureTypeService.Setup(x => x.Update(It.IsAny<DepartureType>(), It.IsAny<object>())).Returns(ct);

                var DepartureTypeObject = DepartureTypeService.Object;
                var p1 = DepartureTypeObject.GetAll();
                var p2 = DepartureTypeObject.Get(1);
                var p3 = DepartureTypeObject.Update(ct, obj);
                var p4 = DepartureTypeObject.Add(ct);
                DepartureTypeObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<DepartureType>>(p1);
                Assert.IsAssignableFrom<DepartureType>(p2);
                Assert.Equal("Test DT", p2.DepartureTypeName);
                Assert.Equal("Test DT", p3.DepartureTypeName);

                DepartureTypeService.VerifyAll();

                DepartureTypeObject.Dispose();
            }
            finally
            {
                DepartureTypeService = null;
            }
        }
    }
}

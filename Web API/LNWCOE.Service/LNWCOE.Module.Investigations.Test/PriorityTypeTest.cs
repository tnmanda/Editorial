using System.Linq;
using LNWCOE.Models.Investigations;
using LNWCOE.Module.Investigations.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Investigations.Test
{
    public class PriorityTypeTest
    {
        [Fact]
        public void PriorityType()
        {
            IQueryable<PriorityType> PriorityTypePriorityType = Enumerable.Empty<PriorityType>().AsQueryable();
            PriorityType ct = new PriorityType { PriorityTypeID = 1, PriorityName = "Test PriorityType" };

            Mock<IPriorityTypeRepository> PriorityTypeService = new Mock<IPriorityTypeRepository>();

            object obj = new object();

            try
            {
                PriorityTypeService.Setup(x => x.GetAll()).Returns(PriorityTypePriorityType);
                PriorityTypeService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                PriorityTypeService.Setup(x => x.Add(It.IsAny<PriorityType>())).Returns(ct);
                PriorityTypeService.Setup(x => x.Delete(It.IsAny<PriorityType>())).Verifiable();
                PriorityTypeService.Setup(x => x.Update(It.IsAny<PriorityType>(), It.IsAny<object>())).Returns(ct);

                var PriorityTypeObject = PriorityTypeService.Object;
                var p1 = PriorityTypeObject.GetAll();
                var p2 = PriorityTypeObject.Get(1);
                var p3 = PriorityTypeObject.Update(ct, obj);
                var p4 = PriorityTypeObject.Add(ct);
                PriorityTypeObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<PriorityType>>(p1);
                Assert.IsAssignableFrom<PriorityType>(p2);
                Assert.Equal("Test PriorityType", p2.PriorityName);
                Assert.Equal("Test PriorityType", p3.PriorityName);

                PriorityTypeService.VerifyAll();

                PriorityTypeObject.Dispose();
            }
            finally
            {
                PriorityTypeService = null;
            }
        }
    }
}

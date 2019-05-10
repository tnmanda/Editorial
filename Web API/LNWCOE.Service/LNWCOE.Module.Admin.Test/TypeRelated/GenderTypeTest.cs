using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Admin.Test.TypeRelated
{
    public class GenderTypeTest
    {
        [Fact]
        public void GenderType()
        {
            IQueryable<GenderType> GenderTypeCollection = Enumerable.Empty<GenderType>().AsQueryable();
            GenderType ct = new GenderType { GenderTypeID = 1, GenderTypeName = "Test GT" };

            Mock<IGenderTypeRepository> GenderTypeService = new Mock<IGenderTypeRepository>();

            object obj = new object();

            try
            {
                GenderTypeService.Setup(x => x.GetAll()).Returns(GenderTypeCollection);
                GenderTypeService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                GenderTypeService.Setup(x => x.Add(It.IsAny<GenderType>())).Returns(ct);
                GenderTypeService.Setup(x => x.Delete(It.IsAny<GenderType>())).Verifiable();
                GenderTypeService.Setup(x => x.Update(It.IsAny<GenderType>(), It.IsAny<object>())).Returns(ct);

                var GenderTypeObject = GenderTypeService.Object;
                var p1 = GenderTypeObject.GetAll();
                var p2 = GenderTypeObject.Get(1);
                var p3 = GenderTypeObject.Update(ct, obj);
                var p4 = GenderTypeObject.Add(ct);
                GenderTypeObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<GenderType>>(p1);
                Assert.IsAssignableFrom<GenderType>(p2);
                Assert.Equal("Test GT", p2.GenderTypeName);
                Assert.Equal("Test GT", p3.GenderTypeName);

                GenderTypeService.VerifyAll();

                GenderTypeObject.Dispose();
            }
            finally
            {
                GenderTypeService = null;
            }
        }
    }
}

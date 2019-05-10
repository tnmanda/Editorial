using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Admin.Test.TypeRelated
{
    public class FunctionTypeTest
    {
        [Fact]
        public void FunctionType()
        {
            IQueryable<FunctionType> FunctionTypeCollection = Enumerable.Empty<FunctionType>().AsQueryable();
            FunctionType ct = new FunctionType { FunctionTypeID = 1, FunctionTypeName = "Test FT" };

            Mock<IFunctionTypeRepository> FunctionTypeService = new Mock<IFunctionTypeRepository>();

            object obj = new object();

            try
            {
                FunctionTypeService.Setup(x => x.GetAll()).Returns(FunctionTypeCollection);
                FunctionTypeService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                FunctionTypeService.Setup(x => x.Add(It.IsAny<FunctionType>())).Returns(ct);
                FunctionTypeService.Setup(x => x.Delete(It.IsAny<FunctionType>())).Verifiable();
                FunctionTypeService.Setup(x => x.Update(It.IsAny<FunctionType>(), It.IsAny<object>())).Returns(ct);

                var FunctionTypeObject = FunctionTypeService.Object;
                var p1 = FunctionTypeObject.GetAll();
                var p2 = FunctionTypeObject.Get(1);
                var p3 = FunctionTypeObject.Update(ct, obj);
                var p4 = FunctionTypeObject.Add(ct);
                FunctionTypeObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<FunctionType>>(p1);
                Assert.IsAssignableFrom<FunctionType>(p2);
                Assert.Equal("Test FT", p2.FunctionTypeName);
                Assert.Equal("Test FT", p3.FunctionTypeName);

                FunctionTypeService.VerifyAll();

                FunctionTypeObject.Dispose();
            }
            finally
            {
                FunctionTypeService = null;
            }
        }
    }
}

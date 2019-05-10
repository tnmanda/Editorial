using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Admin.Test.TypeRelated
{
    public class LanguageTypeTest
    {
        [Fact]
        public void LanguageType()
        {
            IQueryable<LanguageType> LanguageTypeCollection = Enumerable.Empty<LanguageType>().AsQueryable();
            LanguageType ct = new LanguageType { LanguageTypeID = 1, LanguageTypeName = "Test LT" };

            Mock<ILanguageTypeRepository> LanguageTypeService = new Mock<ILanguageTypeRepository>();

            object obj = new object();

            try
            {
                LanguageTypeService.Setup(x => x.GetAll()).Returns(LanguageTypeCollection);
                LanguageTypeService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                LanguageTypeService.Setup(x => x.Add(It.IsAny<LanguageType>())).Returns(ct);
                LanguageTypeService.Setup(x => x.Delete(It.IsAny<LanguageType>())).Verifiable();
                LanguageTypeService.Setup(x => x.Update(It.IsAny<LanguageType>(), It.IsAny<object>())).Returns(ct);

                var LanguageTypeObject = LanguageTypeService.Object;
                var p1 = LanguageTypeObject.GetAll();
                var p2 = LanguageTypeObject.Get(1);
                var p3 = LanguageTypeObject.Update(ct, obj);
                var p4 = LanguageTypeObject.Add(ct);
                LanguageTypeObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<LanguageType>>(p1);
                Assert.IsAssignableFrom<LanguageType>(p2);
                Assert.Equal("Test LT", p2.LanguageTypeName);
                Assert.Equal("Test LT", p3.LanguageTypeName);

                LanguageTypeService.VerifyAll();

                LanguageTypeObject.Dispose();
            }
            finally
            {
                LanguageTypeService = null;
            }
        }
    }
}

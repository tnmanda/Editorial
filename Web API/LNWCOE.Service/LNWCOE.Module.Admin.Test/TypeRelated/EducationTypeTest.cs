using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Admin.Test.TypeRelated
{
    public class EducationTypeTest
    {
        [Fact]
        public void EducationType()
        {
            IQueryable<EducationType> EducationTypeCollection = Enumerable.Empty<EducationType>().AsQueryable();
            EducationType ct = new EducationType { EducationTypeID = 1, EducationName = "Test ET" };

            Mock<IEducationTypeRepository> EducationTypeService = new Mock<IEducationTypeRepository>();

            object obj = new object();

            try
            {
                EducationTypeService.Setup(x => x.GetAll()).Returns(EducationTypeCollection);
                EducationTypeService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                EducationTypeService.Setup(x => x.Add(It.IsAny<EducationType>())).Returns(ct);
                EducationTypeService.Setup(x => x.Delete(It.IsAny<EducationType>())).Verifiable();
                EducationTypeService.Setup(x => x.Update(It.IsAny<EducationType>(), It.IsAny<object>())).Returns(ct);

                var EducationTypeObject = EducationTypeService.Object;
                var p1 = EducationTypeObject.GetAll();
                var p2 = EducationTypeObject.Get(1);
                var p3 = EducationTypeObject.Update(ct, obj);
                var p4 = EducationTypeObject.Add(ct);
                EducationTypeObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<EducationType>>(p1);
                Assert.IsAssignableFrom<EducationType>(p2);
                Assert.Equal("Test ET", p2.EducationName);
                Assert.Equal("Test ET", p3.EducationName);

                EducationTypeService.VerifyAll();

                EducationTypeObject.Dispose();
            }
            finally
            {
                EducationTypeService = null;
            }
        }
    }
}

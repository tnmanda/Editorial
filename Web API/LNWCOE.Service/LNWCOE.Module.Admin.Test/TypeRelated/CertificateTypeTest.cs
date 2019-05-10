using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Admin.Test.TypeRelated
{
    public class CertificateTypeTest
    {
        [Fact]
        public void CertificateType()
        {
            IQueryable<CertificateType> CertificateTypeCollection = Enumerable.Empty<CertificateType>().AsQueryable();
            CertificateType ct = new CertificateType { CertificateTypeID = 1, CertificateTypeName = "Test CT" };

            Mock<ICertificateTypeRepository> CertificateTypeService = new Mock<ICertificateTypeRepository>();

            object obj = new object();

            try
            {
                CertificateTypeService.Setup(x => x.GetAll()).Returns(CertificateTypeCollection);
                CertificateTypeService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                CertificateTypeService.Setup(x => x.Add(It.IsAny<CertificateType>())).Returns(ct);
                CertificateTypeService.Setup(x => x.Delete(It.IsAny<CertificateType>())).Verifiable();
                CertificateTypeService.Setup(x => x.Update(It.IsAny<CertificateType>(), It.IsAny<object>())).Returns(ct);

                var CertificateTypeObject = CertificateTypeService.Object;
                var p1 = CertificateTypeObject.GetAll();
                var p2 = CertificateTypeObject.Get(1);
                var p3 = CertificateTypeObject.Update(ct, obj);
                var p4 = CertificateTypeObject.Add(ct);
                CertificateTypeObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<CertificateType>>(p1);
                Assert.IsAssignableFrom<CertificateType>(p2);
                Assert.Equal("Test CT", p2.CertificateTypeName);
                Assert.Equal("Test CT", p3.CertificateTypeName);

                CertificateTypeService.VerifyAll();

                CertificateTypeObject.Dispose();
            }
            finally
            {
                CertificateTypeService = null;
            }
        }


    }
}

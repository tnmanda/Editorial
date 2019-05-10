using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Admin.Test.UserRelated
{
    public class AppUserCertificateTest
    {
        [Fact]
        public void AppUserCertificate()
        {
            IQueryable<AppUserCertificate> AppUserCertificateCollection = Enumerable.Empty<AppUserCertificate>().AsQueryable();
            AppUserCertificate ct = new AppUserCertificate { AppUserCertificateID = 1,  CreatedBy = "Test AppUserCertificate" };

            Mock<IAppUserCertificateRepository> AppUserCertificateService = new Mock<IAppUserCertificateRepository>();

            object obj = new object();

            try
            {
                AppUserCertificateService.Setup(x => x.GetAll()).Returns(AppUserCertificateCollection);
                AppUserCertificateService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                AppUserCertificateService.Setup(x => x.Add(It.IsAny<AppUserCertificate>())).Returns(ct);
                AppUserCertificateService.Setup(x => x.Delete(It.IsAny<AppUserCertificate>())).Verifiable();
                AppUserCertificateService.Setup(x => x.Update(It.IsAny<AppUserCertificate>(), It.IsAny<object>())).Returns(ct);

                var AppUserCertificateObject = AppUserCertificateService.Object;
                var p1 = AppUserCertificateObject.GetAll();
                var p2 = AppUserCertificateObject.Get(1);
                var p3 = AppUserCertificateObject.Update(ct, obj);
                var p4 = AppUserCertificateObject.Add(ct);
                AppUserCertificateObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<AppUserCertificate>>(p1);
                Assert.IsAssignableFrom<AppUserCertificate>(p2);
                Assert.Equal("Test AppUserCertificate", p2.CreatedBy);
                Assert.Equal("Test AppUserCertificate", p3.CreatedBy);

                AppUserCertificateService.VerifyAll();

                AppUserCertificateObject.Dispose();
            }
            finally
            {
                AppUserCertificateService = null;
            }
        }
    }
}

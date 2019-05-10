using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Admin.Test.UserRelated
{
    public class AppUserContactTest
    {
        [Fact]
        public void AppUserContact()
        {
            IQueryable<AppUserContact> AppUserContactCollection = Enumerable.Empty<AppUserContact>().AsQueryable();
            AppUserContact ct = new AppUserContact { AppUserContactID = 1, ContactTypeValue = "Test AppUserContact" };

            Mock<IAppUserContactRepository> AppUserContactService = new Mock<IAppUserContactRepository>();

            object obj = new object();

            try
            {
                AppUserContactService.Setup(x => x.GetAll()).Returns(AppUserContactCollection);
                AppUserContactService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                AppUserContactService.Setup(x => x.Add(It.IsAny<AppUserContact>())).Returns(ct);
                AppUserContactService.Setup(x => x.Delete(It.IsAny<AppUserContact>())).Verifiable();
                AppUserContactService.Setup(x => x.Update(It.IsAny<AppUserContact>(), It.IsAny<object>())).Returns(ct);

                var AppUserContactObject = AppUserContactService.Object;
                var p1 = AppUserContactObject.GetAll();
                var p2 = AppUserContactObject.Get(1);
                var p3 = AppUserContactObject.Update(ct, obj);
                var p4 = AppUserContactObject.Add(ct);
                AppUserContactObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<AppUserContact>>(p1);
                Assert.IsAssignableFrom<AppUserContact>(p2);
                Assert.Equal("Test AppUserContact", p2.ContactTypeValue);
                Assert.Equal("Test AppUserContact", p3.ContactTypeValue);

                AppUserContactService.VerifyAll();

                AppUserContactObject.Dispose();
            }
            finally
            {
                AppUserContactService = null;
            }
        }
    }
}

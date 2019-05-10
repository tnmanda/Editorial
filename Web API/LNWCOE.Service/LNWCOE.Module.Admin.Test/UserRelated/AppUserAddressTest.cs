using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Admin.Test.UserRelated
{
    public class AppUserAddressTest
    {
        [Fact]
        public void AppUserAddress()
        {
            IQueryable<AppUserAddress> AppUserAddressCollection = Enumerable.Empty<AppUserAddress>().AsQueryable();
            AppUserAddress ct = new AppUserAddress { AppUserAddressID = 1, Address1 = "Test Address" };

            Mock<IAppUserAddressRepository> AppUserAddressService = new Mock<IAppUserAddressRepository>();

            object obj = new object();

            try
            {
                AppUserAddressService.Setup(x => x.GetAll()).Returns(AppUserAddressCollection);
                AppUserAddressService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                AppUserAddressService.Setup(x => x.Add(It.IsAny<AppUserAddress>())).Returns(ct);
                AppUserAddressService.Setup(x => x.Delete(It.IsAny<AppUserAddress>())).Verifiable();
                AppUserAddressService.Setup(x => x.Update(It.IsAny<AppUserAddress>(), It.IsAny<object>())).Returns(ct);

                var AppUserAddressObject = AppUserAddressService.Object;
                var p1 = AppUserAddressObject.GetAll();
                var p2 = AppUserAddressObject.Get(1);
                var p3 = AppUserAddressObject.Update(ct, obj);
                var p4 = AppUserAddressObject.Add(ct);
                AppUserAddressObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<AppUserAddress>>(p1);
                Assert.IsAssignableFrom<AppUserAddress>(p2);
                Assert.Equal("Test Address", p2.Address1);
                Assert.Equal("Test Address", p3.Address1);

                AppUserAddressService.VerifyAll();

                AppUserAddressObject.Dispose();
            }
            finally
            {
                AppUserAddressService = null;
            }
        }
    }
}

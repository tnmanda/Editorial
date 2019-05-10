using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Admin.Test.UserRelated
{
    public class AppUserCountryTest
    {
        [Fact]
        public void AppUserCountry()
        {
            IQueryable<AppUserCountry> AppUserCountryCollection = Enumerable.Empty<AppUserCountry>().AsQueryable();
            AppUserCountry ct = new AppUserCountry { AppUserCountryID = 1, CreatedBy = "Test AppUserCountry" };

            Mock<IAppUserCountryRepository> AppUserCountryService = new Mock<IAppUserCountryRepository>();

            object obj = new object();

            try
            {
                AppUserCountryService.Setup(x => x.GetAll()).Returns(AppUserCountryCollection);
                AppUserCountryService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                AppUserCountryService.Setup(x => x.Add(It.IsAny<AppUserCountry>())).Returns(ct);
                AppUserCountryService.Setup(x => x.Delete(It.IsAny<AppUserCountry>())).Verifiable();
                AppUserCountryService.Setup(x => x.Update(It.IsAny<AppUserCountry>(), It.IsAny<object>())).Returns(ct);

                var AppUserCountryObject = AppUserCountryService.Object;
                var p1 = AppUserCountryObject.GetAll();
                var p2 = AppUserCountryObject.Get(1);
                var p3 = AppUserCountryObject.Update(ct, obj);
                var p4 = AppUserCountryObject.Add(ct);
                AppUserCountryObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<AppUserCountry>>(p1);
                Assert.IsAssignableFrom<AppUserCountry>(p2);
                Assert.Equal("Test AppUserCountry", p2.CreatedBy);
                Assert.Equal("Test AppUserCountry", p3.CreatedBy);

                AppUserCountryService.VerifyAll();

                AppUserCountryObject.Dispose();
            }
            finally
            {
                AppUserCountryService = null;
            }
        }
    }
}

using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Admin.Test.MiscRelated
{
    public class CountryTest
    {
        [Fact]
        public void Country()
        {
            IQueryable<Country> CountryCollection = Enumerable.Empty<Country>().AsQueryable();
            Country ct = new Country { CountryID = 1, CountryName = "Test Country" };

            Mock<ICountryRepository> CountryService = new Mock<ICountryRepository>();

            object obj = new object();

            try
            {
                CountryService.Setup(x => x.GetAll()).Returns(CountryCollection);
                CountryService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                CountryService.Setup(x => x.Add(It.IsAny<Country>())).Returns(ct);
                CountryService.Setup(x => x.Delete(It.IsAny<Country>())).Verifiable();
                CountryService.Setup(x => x.Update(It.IsAny<Country>(), It.IsAny<object>())).Returns(ct);

                var CountryObject = CountryService.Object;
                var p1 = CountryObject.GetAll();
                var p2 = CountryObject.Get(1);
                var p3 = CountryObject.Update(ct, obj);
                var p4 = CountryObject.Add(ct);
                CountryObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<Country>>(p1);
                Assert.IsAssignableFrom<Country>(p2);
                Assert.Equal("Test Country", p2.CountryName);
                Assert.Equal("Test Country", p3.CountryName);

                CountryService.VerifyAll();

                CountryObject.Dispose();
            }
            finally
            {
                CountryService = null;
            }
        }
    }
}

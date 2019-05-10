using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Admin.Test.MiscRelated
{
    public class OfficeTest
    {
        [Fact]
        public void Office()
        {
            IQueryable<Office> OfficeCollection = Enumerable.Empty<Office>().AsQueryable();
            Office ct = new Office { OfficeID = 1, OfficeName = "Test Office" };

            Mock<IOfficeRepository> OfficeService = new Mock<IOfficeRepository>();

            object obj = new object();

            try
            {
                OfficeService.Setup(x => x.GetAll()).Returns(OfficeCollection);
                OfficeService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                OfficeService.Setup(x => x.Add(It.IsAny<Office>())).Returns(ct);
                OfficeService.Setup(x => x.Delete(It.IsAny<Office>())).Verifiable();
                OfficeService.Setup(x => x.Update(It.IsAny<Office>(), It.IsAny<object>())).Returns(ct);
                OfficeService.Setup(x => x.GetIdIncluding(It.IsAny<int>())).Returns(ct);
                OfficeService.Setup(x => x.GetAllIncludingByName(It.IsAny<string>())).Returns(OfficeCollection);


                var OfficeObject = OfficeService.Object;
                var p1 = OfficeObject.GetAll();
                var p2 = OfficeObject.Get(1);
                var p3 = OfficeObject.Update(ct, obj);
                var p4 = OfficeObject.Add(ct);
                var p5 = OfficeObject.GetIdIncluding(1);
                var p6 = OfficeObject.GetAllIncludingByName("test");

                OfficeObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<Office>>(p1);
                Assert.IsAssignableFrom<Office>(p2);
                Assert.Equal("Test Office", p2.OfficeName);
                Assert.Equal("Test Office", p3.OfficeName);
                Assert.Equal("Test Office", p4.OfficeName);
                Assert.IsAssignableFrom<Office>(p4);
                Assert.IsAssignableFrom<Office>(p5);
                Assert.Equal("Test Office", p5.OfficeName);
                Assert.IsAssignableFrom<IQueryable<Office>>(p6);

                OfficeService.VerifyAll();

                OfficeObject.Dispose();
            }
            finally
            {
                OfficeService = null;
            }
        }
    }
}

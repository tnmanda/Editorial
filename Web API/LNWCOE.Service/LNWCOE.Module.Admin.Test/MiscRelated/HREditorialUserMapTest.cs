using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.Admin.Test.MiscRelated
{
    public class HREditorialUserMapTest
    {
        [Fact]
        public void HREditorialUserMap()
        {
            IQueryable<HREditorialUserMap> HREditorialUserMapCollection = Enumerable.Empty<HREditorialUserMap>().AsQueryable();
            HREditorialUserMap ct = new HREditorialUserMap { HREditorialUserMapID = 1, HumanReviewUserID  = "Test HRID" };

            Mock<IHREditorialUserMapRepository> HREditorialUserMapService = new Mock<IHREditorialUserMapRepository>();

            object obj = new object();

            try
            {
                HREditorialUserMapService.Setup(x => x.GetAll()).Returns(HREditorialUserMapCollection);
                HREditorialUserMapService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                HREditorialUserMapService.Setup(x => x.Add(It.IsAny<HREditorialUserMap>())).Returns(ct);
                HREditorialUserMapService.Setup(x => x.Delete(It.IsAny<HREditorialUserMap>())).Verifiable();
                HREditorialUserMapService.Setup(x => x.Update(It.IsAny<HREditorialUserMap>(), It.IsAny<object>())).Returns(ct);
                HREditorialUserMapService.Setup(x => x.GetIdIncluding(It.IsAny<int>())).Returns(ct);
                HREditorialUserMapService.Setup(x => x.GetAllIncludingByName(It.IsAny<string>())).Returns(HREditorialUserMapCollection);


                var HREditorialUserMapObject = HREditorialUserMapService.Object;
                var p1 = HREditorialUserMapObject.GetAll();
                var p2 = HREditorialUserMapObject.Get(1);
                var p3 = HREditorialUserMapObject.Update(ct, obj);
                var p4 = HREditorialUserMapObject.Add(ct);
                var p5 = HREditorialUserMapObject.GetIdIncluding(1);
                var p6 = HREditorialUserMapObject.GetAllIncludingByName("test");

                HREditorialUserMapObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<HREditorialUserMap>>(p1);
                Assert.IsAssignableFrom<HREditorialUserMap>(p2);
                Assert.Equal("Test HRID", p2.HumanReviewUserID);
                Assert.Equal("Test HRID", p3.HumanReviewUserID);
                Assert.Equal("Test HRID", p4.HumanReviewUserID);
                Assert.IsAssignableFrom<HREditorialUserMap>(p4);
                Assert.IsAssignableFrom<HREditorialUserMap>(p5);
                Assert.Equal("Test HRID", p5.HumanReviewUserID);
                Assert.IsAssignableFrom<IQueryable<HREditorialUserMap>>(p6);

                HREditorialUserMapService.VerifyAll();

                HREditorialUserMapObject.Dispose();
            }
            finally
            {
                HREditorialUserMapService = null;
            }
        }
    }
}

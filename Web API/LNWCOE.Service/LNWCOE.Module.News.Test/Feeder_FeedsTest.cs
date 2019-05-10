using System.Linq;
using LNWCOE.Models.News;
using LNWCOE.Module.News.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.News.Test
{
    public class Feeder_FeedsTest
    {
        [Fact]
        public void Feeder_Feeds()
        {
            IQueryable<Feeder_Feeds> Feeder_FeedsFeeder_Feeds = Enumerable.Empty<Feeder_Feeds>().AsQueryable();
            Feeder_Feeds ct = new Feeder_Feeds { pkFeedID = 1, FeedName = "Test Feeder_Feeds" };

            Mock<IFeeder_FeedsRepository> Feeder_FeedsService = new Mock<IFeeder_FeedsRepository>();

            object obj = new object();

            try
            {
                Feeder_FeedsService.Setup(x => x.GetAll()).Returns(Feeder_FeedsFeeder_Feeds);
                Feeder_FeedsService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                Feeder_FeedsService.Setup(x => x.Add(It.IsAny<Feeder_Feeds>())).Returns(ct);
                Feeder_FeedsService.Setup(x => x.Delete(It.IsAny<Feeder_Feeds>())).Verifiable();
                Feeder_FeedsService.Setup(x => x.Update(It.IsAny<Feeder_Feeds>(), It.IsAny<object>())).Returns(ct);

                var Feeder_FeedsObject = Feeder_FeedsService.Object;
                var p1 = Feeder_FeedsObject.GetAll();
                var p2 = Feeder_FeedsObject.Get(1);
                var p3 = Feeder_FeedsObject.Update(ct, obj);
                var p4 = Feeder_FeedsObject.Add(ct);
                Feeder_FeedsObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<Feeder_Feeds>>(p1);
                Assert.IsAssignableFrom<Feeder_Feeds>(p2);
                Assert.Equal("Test Feeder_Feeds", p2.FeedName);
                Assert.Equal("Test Feeder_Feeds", p3.FeedName);

                Feeder_FeedsService.VerifyAll();

                Feeder_FeedsObject.Dispose();
            }
            finally
            {
                Feeder_FeedsService = null;
            }
        }
    }
}

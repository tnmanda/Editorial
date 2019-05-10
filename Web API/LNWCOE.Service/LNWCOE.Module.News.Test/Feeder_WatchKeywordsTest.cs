using System.Linq;
using LNWCOE.Models.News;
using LNWCOE.Module.News.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.News.Test
{
    public class Feeder_WatchKeywordsTest
    {
        [Fact]
        public void Feeder_WatchKeywords()
        {
            IQueryable<Feeder_WatchKeywords> Feeder_WatchKeywordsFeeder_WatchKeywords = Enumerable.Empty<Feeder_WatchKeywords>().AsQueryable();
            Feeder_WatchKeywords ct = new Feeder_WatchKeywords { pkKeywordID = 1, Keyword = "Test Feeder_WatchKeywords" };

            Mock<IFeeder_WatchKeywordsRepository> Feeder_WatchKeywordsService = new Mock<IFeeder_WatchKeywordsRepository>();

            object obj = new object();

            try
            {
                Feeder_WatchKeywordsService.Setup(x => x.GetAll()).Returns(Feeder_WatchKeywordsFeeder_WatchKeywords);
                Feeder_WatchKeywordsService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                Feeder_WatchKeywordsService.Setup(x => x.Add(It.IsAny<Feeder_WatchKeywords>())).Returns(ct);
                Feeder_WatchKeywordsService.Setup(x => x.Delete(It.IsAny<Feeder_WatchKeywords>())).Verifiable();
                Feeder_WatchKeywordsService.Setup(x => x.Update(It.IsAny<Feeder_WatchKeywords>(), It.IsAny<object>())).Returns(ct);

                var Feeder_WatchKeywordsObject = Feeder_WatchKeywordsService.Object;
                var p1 = Feeder_WatchKeywordsObject.GetAll();
                var p2 = Feeder_WatchKeywordsObject.Get(1);
                var p3 = Feeder_WatchKeywordsObject.Update(ct, obj);
                var p4 = Feeder_WatchKeywordsObject.Add(ct);
                Feeder_WatchKeywordsObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<Feeder_WatchKeywords>>(p1);
                Assert.IsAssignableFrom<Feeder_WatchKeywords>(p2);
                Assert.Equal("Test Feeder_WatchKeywords", p2.Keyword);
                Assert.Equal("Test Feeder_WatchKeywords", p3.Keyword);

                Feeder_WatchKeywordsService.VerifyAll();

                Feeder_WatchKeywordsObject.Dispose();
            }
            finally
            {
                Feeder_WatchKeywordsService = null;
            }
        }
    }
}

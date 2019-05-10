using System.Linq;
using LNWCOE.Models.News;
using LNWCOE.Module.News.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.News.Test
{
    public class NewsStatusTest
    {
        [Fact]
        public void NewsStatus()
        {
            IQueryable<NewsStatus> NewsStatusNewsStatus = Enumerable.Empty<NewsStatus>().AsQueryable();
            NewsStatus ct = new NewsStatus { NewsStatusID = 1,  NewsStatusDescription = "Test NewsStatus" };

            Mock<INewsStatusRepository> NewsStatusService = new Mock<INewsStatusRepository>();

            object obj = new object();

            try
            {
                NewsStatusService.Setup(x => x.GetAll()).Returns(NewsStatusNewsStatus);
                NewsStatusService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                NewsStatusService.Setup(x => x.Add(It.IsAny<NewsStatus>())).Returns(ct);
                NewsStatusService.Setup(x => x.Delete(It.IsAny<NewsStatus>())).Verifiable();
                NewsStatusService.Setup(x => x.Update(It.IsAny<NewsStatus>(), It.IsAny<object>())).Returns(ct);

                var NewsStatusObject = NewsStatusService.Object;
                var p1 = NewsStatusObject.GetAll();
                var p2 = NewsStatusObject.Get(1);
                var p3 = NewsStatusObject.Update(ct, obj);
                var p4 = NewsStatusObject.Add(ct);
                NewsStatusObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<NewsStatus>>(p1);
                Assert.IsAssignableFrom<NewsStatus>(p2);
                Assert.Equal("Test NewsStatus", p2.NewsStatusDescription);
                Assert.Equal("Test NewsStatus", p3.NewsStatusDescription);

                NewsStatusService.VerifyAll();

                NewsStatusObject.Dispose();
            }
            finally
            {
                NewsStatusService = null;
            }
        }
    }
}

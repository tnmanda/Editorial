using System.Linq;
using LNWCOE.Models.News;
using LNWCOE.Module.News.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.News.Test
{
    public class FeedItemQueueTest
    {
        [Fact]
        public void FeedItemQueue()
        {
            IQueryable<FeedItemQueue> FeedItemQueueFeedItemQueue = Enumerable.Empty<FeedItemQueue>().AsQueryable();
            FeedItemQueue ct = new FeedItemQueue { id = 1, itemType = 123 };

            Mock<IFeedItemQueueRepository> FeedItemQueueService = new Mock<IFeedItemQueueRepository>();

            object obj = new object();

            try
            {
                FeedItemQueueService.Setup(x => x.GetAll()).Returns(FeedItemQueueFeedItemQueue);
                FeedItemQueueService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                FeedItemQueueService.Setup(x => x.Add(It.IsAny<FeedItemQueue>())).Returns(ct);
                FeedItemQueueService.Setup(x => x.Delete(It.IsAny<FeedItemQueue>())).Verifiable();
                FeedItemQueueService.Setup(x => x.Update(It.IsAny<FeedItemQueue>(), It.IsAny<object>())).Returns(ct);

                var FeedItemQueueObject = FeedItemQueueService.Object;
                var p1 = FeedItemQueueObject.GetAll();
                var p2 = FeedItemQueueObject.Get(1);
                var p3 = FeedItemQueueObject.Update(ct, obj);
                var p4 = FeedItemQueueObject.Add(ct);
                FeedItemQueueObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<FeedItemQueue>>(p1);
                Assert.IsAssignableFrom<FeedItemQueue>(p2);
                Assert.Equal(123, p2.itemType);
                Assert.Equal(123, p3.itemType);

                FeedItemQueueService.VerifyAll();

                FeedItemQueueObject.Dispose();
            }
            finally
            {
                FeedItemQueueService = null;
            }
        }
    }
}

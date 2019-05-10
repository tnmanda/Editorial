using System.Linq;
using LNWCOE.Models.News;
using LNWCOE.Module.News.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.News.Test
{
    public class FeedItemQueueLocksTest
    {
        [Fact]
        public void FeedItemQueueLocks()
        {
            IQueryable<FeedItemQueueLocks> FeedItemQueueLocksFeedItemQueueLocks = Enumerable.Empty<FeedItemQueueLocks>().AsQueryable();
            FeedItemQueueLocks ct = new FeedItemQueueLocks { ID = 1, fkItemID = 123 };

            Mock<IFeedItemQueueLocksRepository> FeedItemQueueLocksService = new Mock<IFeedItemQueueLocksRepository>();

            object obj = new object();

            try
            {
                FeedItemQueueLocksService.Setup(x => x.GetAll()).Returns(FeedItemQueueLocksFeedItemQueueLocks);
                FeedItemQueueLocksService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                FeedItemQueueLocksService.Setup(x => x.Add(It.IsAny<FeedItemQueueLocks>())).Returns(ct);
                FeedItemQueueLocksService.Setup(x => x.Delete(It.IsAny<FeedItemQueueLocks>())).Verifiable();
                FeedItemQueueLocksService.Setup(x => x.Update(It.IsAny<FeedItemQueueLocks>(), It.IsAny<object>())).Returns(ct);

                var FeedItemQueueLocksObject = FeedItemQueueLocksService.Object;
                var p1 = FeedItemQueueLocksObject.GetAll();
                var p2 = FeedItemQueueLocksObject.Get(1);
                var p3 = FeedItemQueueLocksObject.Update(ct, obj);
                var p4 = FeedItemQueueLocksObject.Add(ct);
                FeedItemQueueLocksObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<FeedItemQueueLocks>>(p1);
                Assert.IsAssignableFrom<FeedItemQueueLocks>(p2);
                Assert.Equal(123, p2.fkItemID);
                Assert.Equal(123, p3.fkItemID);

                FeedItemQueueLocksService.VerifyAll();

                FeedItemQueueLocksObject.Dispose();
            }
            finally
            {
                FeedItemQueueLocksService = null;
            }
        }
    }
}

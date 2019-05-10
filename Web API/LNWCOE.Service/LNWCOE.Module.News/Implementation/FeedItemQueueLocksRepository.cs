using LNWCOE.Models.Context;
using LNWCOE.Models.News;
using LNWCOE.Module.News.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.News.Implementation
{
    public class FeedItemQueueLocksRepository : Repository<FeedItemQueueLocks>, IFeedItemQueueLocksRepository
    {
        private new readonly NewsFeedDataContext _context;

        public FeedItemQueueLocksRepository(NewsFeedDataContext context) : base(context)
        {
            _context = context;
        }
    }
}

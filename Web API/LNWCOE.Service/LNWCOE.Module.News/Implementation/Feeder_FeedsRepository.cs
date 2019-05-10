using LNWCOE.Models.Context;
using LNWCOE.Models.News;
using LNWCOE.Module.News.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.News.Implementation
{
    public class Feeder_FeedsRepository : Repository<Feeder_Feeds>, IFeeder_FeedsRepository
    {
        private new readonly NewsFeedDataContext _context;

        public Feeder_FeedsRepository(NewsFeedDataContext context) : base(context)
        {
            _context = context;
        }
    }
}

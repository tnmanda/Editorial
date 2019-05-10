using LNWCOE.Models.Context;
using LNWCOE.Models.News;
using LNWCOE.Module.News.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.News.Implementation
{
    public class Feeder_FeedArtiklesRepository : Repository<Feeder_FeedArtikles>, IFeeder_FeedArtiklesRepository
    {
        private new readonly NewsFeedDataContext _context;

        public Feeder_FeedArtiklesRepository(NewsFeedDataContext context) : base(context)
        {
            _context = context;
        }
    }
}

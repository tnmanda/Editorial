using LNWCOE.Models.News;
using Microsoft.EntityFrameworkCore;

namespace LNWCOE.Models.Context
{
    public class NewsFeedDataContext : DbContext
    {
        public NewsFeedDataContext(DbContextOptions<NewsFeedDataContext> options) : base(options) { }

        public DbSet<Feeder_watches> Feeder_watches { get; set; }
        public DbSet<Feeder_WatchKeywords> Feeder_WatchKeywords { get; set; }
        public DbSet<FeedItemQueue> FeedItemQueue { get; set; }
        public DbSet<Feeder_FeedArtikles> Feeder_FeedArtikles { get; set; }
        public DbSet<Feeder_Feeds> Feeder_Feeds { get; set; }
        public DbSet<FeedItemQueueLocks> FeedItemQueueLocks { get; set; }
        
        
    }
}

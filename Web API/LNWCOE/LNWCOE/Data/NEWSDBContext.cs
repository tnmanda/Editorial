using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using LNWCOE.Models.News;

namespace LNWCOE.Data
{
    public class NEWSDBContext : DbContext
    {
        private readonly ILogger<NEWSDBContext> _logger;

        public NEWSDBContext(DbContextOptions<NEWSDBContext> options, ILogger<NEWSDBContext> logger) : base(options)
        {
            this._logger = logger;
        }

        public DbSet<FeedItemQueue> FeedItemQueue { get; set; }
        public DbSet<Feeder_watches> Feeder_Watches { get; set; }
        public DbSet<Feeder_FeedArtikles> Feeder_FeedArtikles { get; set; }
        public DbSet<Feeder_Feeds> Feeder_Feeds { get; set; }
        public DbSet<FeedItemQueueLocks> FeedItemQueueLocks { get; set; }

        public DbSet<Feeder_WatchKeywords> Feeder_WatchKeywords { get; set; }
       
    }
}

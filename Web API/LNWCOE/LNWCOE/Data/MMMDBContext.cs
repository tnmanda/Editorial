using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using LNWCOE.Models.Entity;

namespace LNWCOE.Data
{
    public class MMMDBContext : DbContext
    {
        private readonly ILogger<MMMDBContext> _logger;

        public MMMDBContext(DbContextOptions<MMMDBContext> options, ILogger<MMMDBContext> logger) : base(options)
        {
            this._logger = logger;
        }

        public DbSet<Entities> Entities { get; set; }

        public DbSet<EntitiesCategories> EntitiesCategories { get; set; }
        public DbSet<EntitiesSubCategories> EntitiesSubCategories { get; set; }
        public DbSet<EntitiesLevels> EntitiesLevels { get; set; }
        public DbSet<EntitiesSources> EntitiesSources { get; set; }
    }
}

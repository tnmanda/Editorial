using LNWCOE.Models.MMM;
using Microsoft.EntityFrameworkCore;

namespace LNWCOE.Models.Context
{
    public class MMMDataContext : DbContext
    {
        public MMMDataContext(DbContextOptions<MMMDataContext> options) : base(options) { }

        public DbSet<Entities> Entities { get; set; }
        public DbSet<EntitiesLevels> EntitiesLevels { get; set; }
        public DbSet<EntitiesSubCategories> EntitiesSubCategories { get; set; }
        public DbSet<EntitiesCategories> EntitiesCategories { get; set; }
        public DbSet<EntitiesSources> EntitiesSources { get; set; }
    }
}

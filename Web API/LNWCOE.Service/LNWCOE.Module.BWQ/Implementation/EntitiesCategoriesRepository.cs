using LNWCOE.Models.Context;
using LNWCOE.Models.MMM;
using LNWCOE.Module.BWQ.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.BWQ.Implementation
{
    public class EntitiesCategoriesRepository : Repository<EntitiesCategories>, IEntitiesCategoriesRepository
    {
        private new readonly MMMDataContext _context;

        public EntitiesCategoriesRepository(MMMDataContext context) : base(context)
        {
            _context = context;
        }
    }
}

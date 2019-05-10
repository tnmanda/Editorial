using LNWCOE.Models.BWQ;
using LNWCOE.Models.Context;
using LNWCOE.Models.MMM;
using LNWCOE.Module.BWQ.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.BWQ.Implementation
{
    public class EntitiesSubCategoriesRepository : Repository<EntitiesSubCategories>, IEntitiesSubCategoriesRepository
    {
        private new readonly MMMDataContext _context;

        public EntitiesSubCategoriesRepository(MMMDataContext context) : base(context)
        {
            _context = context;
        }
    }
}

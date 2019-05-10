using LNWCOE.Models.Context;
using LNWCOE.Models.MMM;
using LNWCOE.Module.BWQ.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.BWQ.Implementation
{
    public class EntitiesSourcesRepository : Repository<EntitiesSources>, IEntitiesSourcesRepository
    {
        private new readonly MMMDataContext _context;

        public EntitiesSourcesRepository(MMMDataContext context) : base(context)
        {
            _context = context;
        }
    }
}

using LNWCOE.Models.Context;
using LNWCOE.Models.MMM;
using LNWCOE.Module.BWQ.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.BWQ.Implementation
{
    public class EntitiesLevelsRepository : Repository<EntitiesLevels>, IEntitiesLevelsRepository
    {
        private new readonly MMMDataContext _context;

        public EntitiesLevelsRepository(MMMDataContext context) : base(context)
        {
            _context = context;
        }
    }
}

using LNWCOE.Models.Context;
using LNWCOE.Models.Investigations;
using LNWCOE.Module.Investigations.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.BWQ.Implementation
{
    public class PriorityTypeRepository : Repository<PriorityType>, IPriorityTypeRepository
    {
        private new readonly EditorialDataContext _context;

        public PriorityTypeRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }
    }
}

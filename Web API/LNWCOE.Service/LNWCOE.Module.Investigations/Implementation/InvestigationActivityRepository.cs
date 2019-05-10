using LNWCOE.Models.Context;
using LNWCOE.Models.Investigations;
using LNWCOE.Module.Investigations.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.BWQ.Implementation
{
    public class InvestigationActivityRepository : Repository<InvestigationActivity>, IInvestigationActivityRepository
    {
        private new readonly EditorialDataContext _context;

        public InvestigationActivityRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }
    }
}

using LNWCOE.Models.Context;
using LNWCOE.Models.Investigations;
using LNWCOE.Module.Investigations.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.BWQ.Implementation
{
    public class InvestigationStatusRepository : Repository<InvestigationStatus>, IInvestigationStatusRepository
    {
        private new readonly EditorialDataContext _context;

        public InvestigationStatusRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }
    }
}

using LNWCOE.Models.Context;
using LNWCOE.Models.Investigations;
using LNWCOE.Module.Investigations.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.BWQ.Implementation
{
    public class InvestigationCategoryRepository : Repository<InvestigationCategory>, IInvestigationCategoryRepository
    {
        private new readonly EditorialDataContext _context;

        public InvestigationCategoryRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }
    }
}

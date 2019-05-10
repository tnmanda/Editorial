using LNWCOE.Models.Context;
using LNWCOE.Models.Investigations;
using LNWCOE.Module.Investigations.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.BWQ.Implementation
{
    public class InvestigationDispositionsRepository : Repository<InvestigationDispositions>, IInvestigationDispositionsRepository
    {
        private new readonly EditorialDataContext _context;

        public InvestigationDispositionsRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }
    }
}

using LNWCOE.Models.Context;
using LNWCOE.Models.Investigations;
using LNWCOE.Module.Investigations.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.BWQ.Implementation
{
    public class InvestigationNoteRepository : Repository<InvestigationNote>, IInvestigationNoteRepository
    {
        private new readonly EditorialDataContext _context;

        public InvestigationNoteRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }
    }
}

using LNWCOE.Models.Context;
using LNWCOE.Models.Investigations;
using LNWCOE.Module.Investigations.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.BWQ.Implementation
{
    public class InvestigationEmailsRepository : Repository<InvestigationEmails>, IInvestigationEmailsRepository
    {
        private new readonly EditorialDataContext _context;

        public InvestigationEmailsRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }
    }
}

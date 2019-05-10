using LNWCOE.Models.Context;
using LNWCOE.Models.Investigations;
using LNWCOE.Module.Investigations.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.BWQ.Implementation
{
    public class InvestigationEntityRepository : Repository<InvestigationEntity>, IInvestigationEntityRepository
    {
        private new readonly EditorialDataContext _context;

        public InvestigationEntityRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }
    }
}

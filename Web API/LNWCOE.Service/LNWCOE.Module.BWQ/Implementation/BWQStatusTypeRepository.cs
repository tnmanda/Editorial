using LNWCOE.Models.BWQ;
using LNWCOE.Models.Context;
using LNWCOE.Module.BWQ.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.BWQ.Implementation
{
    public class BWQStatusTypeRepository : Repository<BWQStatusType>, IBWQStatusTypeRepository
    {
        private new readonly EditorialDataContext _context;

        public BWQStatusTypeRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }
    }
}

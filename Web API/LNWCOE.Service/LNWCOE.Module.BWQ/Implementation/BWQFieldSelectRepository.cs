using LNWCOE.Models.BWQ;
using LNWCOE.Models.Context;
using LNWCOE.Module.BWQ.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.BWQ.Implementation
{
    public class BWQFieldSelectRepository : Repository<BWQFieldSelect>, IBWQFieldSelectRepository
    {
        private new readonly EditorialDataContext _context;
        
        public BWQFieldSelectRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }
    }
}

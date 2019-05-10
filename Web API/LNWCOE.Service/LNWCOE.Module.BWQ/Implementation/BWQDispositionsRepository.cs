using LNWCOE.Models.BWQ;
using LNWCOE.Models.Context;
using LNWCOE.Module.BWQ.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.BWQ.Implementation
{
    public class BWQDispositionsRepository : Repository<BWQDispositions>, IBWQDispositionsRepository
    {
        private new readonly EditorialDataContext _context;

        public BWQDispositionsRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }
    }
}

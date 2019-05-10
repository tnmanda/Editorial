using LNWCOE.Models.Admin;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Implementation
{
    public class FunctionTypeRepository : Repository<FunctionType>, IFunctionTypeRepository
    {
        private new readonly EditorialDataContext _context;

        public FunctionTypeRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }
    }

}

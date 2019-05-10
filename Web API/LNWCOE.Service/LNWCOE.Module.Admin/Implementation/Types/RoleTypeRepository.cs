using LNWCOE.Models.Admin;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Implementation
{
    public class RoleTypeRepository : Repository<RoleType>, IRoleTypeRepository
    {
        private new readonly EditorialDataContext _context;

        public RoleTypeRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }
    }

}

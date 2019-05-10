using LNWCOE.Models.Admin;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Implementation
{
    public class OperationalRoleTypeRepository : Repository<OperationalRoleType>, IOperationalRoleTypeRepository
    {
        private new readonly EditorialDataContext _context;

        public OperationalRoleTypeRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }
    }

}

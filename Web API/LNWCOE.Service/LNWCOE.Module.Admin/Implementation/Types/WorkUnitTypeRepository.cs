using LNWCOE.Models.Admin;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Implementation
{
    public class WorkUnitTypeRepository : Repository<WorkUnitType>, IWorkUnitTypeRepository
    {
        private new readonly EditorialDataContext _context;

        public WorkUnitTypeRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }
    }

}

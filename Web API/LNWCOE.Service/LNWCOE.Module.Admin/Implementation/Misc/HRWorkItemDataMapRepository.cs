using LNWCOE.Models.Admin;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Implementation
{
    public class HRWorkItemDataMapRepository : Repository<HRWorkItemDataMap>, IHRWorkItemDataMapRepository
    {
        private new readonly EditorialDataContext _context;

        public HRWorkItemDataMapRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }
    }

}

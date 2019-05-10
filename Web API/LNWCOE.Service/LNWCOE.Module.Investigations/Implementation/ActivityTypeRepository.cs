using LNWCOE.Models.Context;
using LNWCOE.Models.Investigations;
using LNWCOE.Module.Investigations.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.BWQ.Implementation
{
    public class ActivityTypeRepository : Repository<ActivityType>, IActivityTypeRepository
    {
        private new readonly EditorialDataContext _context;

        public ActivityTypeRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }
    }
}

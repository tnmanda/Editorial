using LNWCOE.Models.Alerts;
using LNWCOE.Models.Context;
using LNWCOE.Module.Alerts.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.Alerts.Implementation
{
    public class AlertScheduleTypeRepository : Repository<AlertScheduleType>, IAlertScheduleTypeRepository
    {
        private new readonly EditorialDataContext _context;

        public AlertScheduleTypeRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }
    }
}

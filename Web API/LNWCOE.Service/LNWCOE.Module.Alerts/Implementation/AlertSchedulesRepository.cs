using LNWCOE.Models.Alerts;
using LNWCOE.Models.Context;
using LNWCOE.Module.Alerts.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.Alerts.Implementation
{
    public class AlertSchedulesRepository : Repository<AlertSchedules>, IAlertSchedulesRepository
    {
        private new readonly EditorialDataContext _context;

        public AlertSchedulesRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }
    }
}

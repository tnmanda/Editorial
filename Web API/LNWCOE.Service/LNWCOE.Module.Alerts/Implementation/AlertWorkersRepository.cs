using LNWCOE.Models.Alerts;
using LNWCOE.Models.Context;
using LNWCOE.Module.Alerts.Interface;
using Repository.DataAccess;


namespace LNWCOE.Module.Alerts.Implementation
{
    public class AlertWorkersRepository : Repository<AlertWorkers>, IAlertWorkersRepository
    {
        private new readonly EditorialDataContext _context;

        public AlertWorkersRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }
    }
}

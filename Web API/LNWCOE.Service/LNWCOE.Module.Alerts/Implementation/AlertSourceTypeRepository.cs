using LNWCOE.Models.Alerts;
using LNWCOE.Models.Context;
using LNWCOE.Module.Alerts.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.Alerts.Implementation
{
    public class AlertSourceTypeRepository : Repository<AlertSourceType>, IAlertSourceTypeRepository
    {
        private new readonly EditorialDataContext _context;

        public AlertSourceTypeRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }
    }
}

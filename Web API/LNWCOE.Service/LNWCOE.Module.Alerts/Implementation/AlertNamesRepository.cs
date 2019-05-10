using System.Collections.Generic;
using System.Linq;
using LNWCOE.Models.Alerts;
using LNWCOE.Models.Context;
using LNWCOE.Module.Alerts.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.Alerts.Implementation
{
    public class AlertNamesRepository : Repository<AlertNames>, IAlertNamesRepository
    {
        private new readonly EditorialDataContext _context;

        public AlertNamesRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<AlertNames> GetByJobID(int id)
        {
            var query = base.GetAll()
               .Where(x => x.AlertJobsID == id);
            return query;
        }

    }
}

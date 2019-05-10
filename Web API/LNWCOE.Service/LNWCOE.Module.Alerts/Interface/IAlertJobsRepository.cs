using System.Collections.Generic;
using LNWCOE.Models.Alerts;
using Repository.DataAccess;

namespace LNWCOE.Module.Alerts.Interface
{
    public interface IAlertJobsRepository : IRepository<AlertJobs>
    {
        AlertJobs GetIdIncluding(int id);
        IEnumerable<AlertJobs> GetAllIncludingByName();
        IEnumerable<AlertJobs> InActiveAlerts();
        IEnumerable<PastDueAlert> GetPastDueAlerts();
    }
}

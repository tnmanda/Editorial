using System.Collections.Generic;
using LNWCOE.Models.Admin;
using LNWCOE.Models.Alerts;
using Microsoft.Extensions.Configuration;
using Repository.DataAccess;

namespace LNWCOE.Module.Alerts.Interface
{
    public interface IAlertJobsQueueRepository : IRepository<AlertJobsQueue>
    {
        
        IEnumerable<AlertJobsQueue> GetByJobId(int id);
        IEnumerable<CollectionItem> GetAlertPriority();
        IEnumerable<CollectionItem> GetAlertStatus();
        IEnumerable<CollectionItem> GetAlertDisposition();
        AlertJobsQueue CloseAlertJobsQueue(int id);
        AlertJobsQueue CreateAlertJobsQueue(AlertJobsQueueData newdata, IConfiguration configuration);
        IEnumerable<AlertJobData> GetAlertBatches();
        AlertJobsQueue DeleteJobQueueEntry(AlertJobsQueue alertQObject);

    }
}


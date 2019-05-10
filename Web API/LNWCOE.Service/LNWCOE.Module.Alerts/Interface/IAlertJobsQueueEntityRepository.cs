using System;
using System.Collections.Generic;
using LNWCOE.Models.Admin;
using LNWCOE.Models.Alerts;
using LNWCOE.Models.HR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration; 
using Repository.DataAccess;

namespace LNWCOE.Module.Alerts.Interface
{
    public interface IAlertJobsQueueEntityRepository : IRepository<AlertJobsQueueEntity>
    {
        object GetAlertBatchItems();
        object GetAlertBatchItems_v1();

        IEnumerable<AlertJobFilterData> GetFilteredAlertEntities(AlertJobFilter filter);
        IEnumerable<AlertJobFilterData_v1> GetFilteredAlertEntities_v1(AlertJobFilter_v1 filter, string SuperUserId);

        object CheckWorkItemIDForEntity(WorkItemPostData postData, IConfiguration configuration);
        object CheckWorkItemIDForEntity_v1(WorkItemPostData postData, IConfiguration configuration);

        AlertJobsQueueEntityData GetByGuid(Guid guid);
        AlertJobsQueueEntityData GetByGuid_v1(Guid guid);

        AlertJobsQueueEntity UpdateEntry(AlertJobsQueueEntityDataSave updatedata, IConfiguration configuration);


        object LockAlert(int AlertNameID, int AppUserID);
        object UnlockAlert(int AlertNameID, int AppUserID);

    }
}


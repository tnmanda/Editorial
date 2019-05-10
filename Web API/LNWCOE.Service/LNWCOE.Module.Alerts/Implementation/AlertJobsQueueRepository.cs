using LNWCOE.Models.Admin;
using LNWCOE.Models.Alerts;
using LNWCOE.Models.Context;
using LNWCOE.Module.Alerts.Interface;
using Microsoft.Extensions.Configuration;
using Repository.DataAccess;
using System.Collections.Generic;
using System.Linq;
using LNWCOE.Service.Helpers;
using LNWCOE.Models.HR;
using System;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;

namespace LNWCOE.Module.Alerts.Implementation
{
    public class AlertJobsQueueRepository : Repository<AlertJobsQueue>, IAlertJobsQueueRepository
    {
        private new readonly EditorialDataContext _context;

        public AlertJobsQueueRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<AlertJobsQueue> GetByJobId(int id)
        {
            var query = base.GetAll()
               .Where(x => x.AlertJobsQueueID == id);
            return query;
        }

        public IEnumerable<CollectionItem> GetAlertPriority()
        {
            var result = _context
                .CollectionItem
                .Include("Collection")
                .Where(x => x.CollectionID == 15); // High, Normal.  From the [Collection] table
            return result;
        }

        public IEnumerable<CollectionItem> GetAlertStatus()
        {
            var result = _context
               .CollectionItem
               .Include("Collection")
               .Where(x => x.CollectionID == 14); // Open, Closed.  From the [Collection] table
            return result;
        }

        public IEnumerable<CollectionItem> GetAlertDisposition()
        {
            /*
            From the [Collection] table 
                Initial
                Added
                Updated
                Unchanged
                Deleted
                Broken Alert
                Out of Scope
                Deferred
             */

            var result = _context
              .CollectionItem
              .Include("Collection")
              .Where(x => x.CollectionID == 8);
            return result;
        }
        
        public AlertJobsQueue CloseAlertJobsQueue(int id)
        {
            var toclose = _context.AlertJobsQueue.Where(x => x.AlertJobsQueueID == id).FirstOrDefault();

            if (toclose != null)
            {
                if(toclose.StatusCollectionItemID != 1048)
                {
                    toclose.StatusCollectionItemID = 1048; // under table "CollectionItem".  Statues entry for closed Alerts
                    _context.SaveChanges();
                }
                return toclose;
            }
            return toclose;
        }

        // 
        public IEnumerable<AlertJobData> GetAlertBatches()
        {
            var result = _context.AlertJobData.AsNoTracking().FromSql($"usp_AlertsGetBatches_sel")
              .Select(navdata => new AlertJobData
              {
                  AlertJobsQueueID = navdata.AlertJobsQueueID,
                  Description = navdata.Description,
                  JobName = navdata.JobName,
                  JobURL = navdata.JobURL,
                  Status = navdata.Status,
                  Created = navdata.Created,
                  Due = navdata.Due,
                  Priority = navdata.Priority,
                  Total = navdata.Total,
                  Remaining = navdata.Remaining
              });

            return result;
        }

        public AlertJobsQueue CreateAlertJobsQueue(AlertJobsQueueData newdata, IConfiguration configuration)
        {
            bool DataValid = ValidateAlertJobsQueueData(newdata, configuration);
            if (DataValid == false)
            {
                return null;
            }

            //
            // Editorial Routines

            AlertJobsQueue alertJobQueue = newdata.AlertJobsQueue;
            List<AlertNames> alertNames = newdata.AlertNames;

            int alertJobsQueueID = 0;
            var identity = alertJobQueue.CreatedBy;

            // Save the Job Queue entry
            var returnObject = _context.AlertJobsQueue.Add(alertJobQueue);
            _context.SaveChanges();

            // check id of new Batch contained in alertJobQueue
            alertJobsQueueID = alertJobQueue.AlertJobsQueueID;
            var todayUtc = DateTime.UtcNow;

            // Save each Alert Entitiy
            foreach (var alertname in alertNames)
            {
                var newAlertEntity = new AlertJobsQueueEntity
                {
                    AlertNameID = alertname.AlertNameID,
                    AlertJobsQueueID = alertJobsQueueID,
                    CreatedBy = identity,
                    UpdatedBy = identity,
                    DateCreatedUTC = todayUtc,
                    LastUpdatedUTC = todayUtc,
                    StatusID = 26 // Newly Created, based in CollectionItem, CollectionID
                };
                _context.AlertJobsQueueEntity.Add(newAlertEntity);
            }
            _context.SaveChanges();


            //
            // Human Review routines

            var AlertEntities = _context.AlertJobsQueueEntity.Where(t => t.AlertJobsQueueID == alertJobsQueueID);
            var Modules = _context.ApplicationModules;

            // Human Review Queue Guid saved in the Editorial Database
            var QueueGuid = (from mods in Modules where mods.ModuleName == EditorialModules.Alerts select mods.QueueGuid).FirstOrDefault();
            var QueueGuidString = QueueGuid.ToString();

            foreach (var alertentity in AlertEntities)
            {
                var JsonData = JsonConvert.SerializeObject(alertentity);

                var HRCreateRequest = Helper.BuildHRWorkItemRequest(EditorialModules.Alerts,
                    QueueGuidString, JsonData,
                    configuration, null, HRRequestMode.Create);
      
                var returnGuid = Helper.GetHRWorkItem((WorkItemRequest)HRCreateRequest, newdata.HRToken, configuration);

                if (returnGuid.Value.workItemGuid == null)
                {
                    return null;
                }

                // Save the WorkItemGuid created above to this Alert Entity entry
                alertentity.WorkItemID = new Guid(returnGuid.Value.workItemGuid); 

            }
            
            _context.SaveChanges();

            return alertJobQueue;

        }


        private bool ValidateAlertJobsQueueData(AlertJobsQueueData newdata, IConfiguration configuration)
        {

            var HRToken = new JwtSecurityToken(newdata.HRToken);

            if(Helper.TokenValid(HRToken) == false)
            {
                return false;
            }

            if (newdata.HRToken.Trim() == "")
            {
                return false;
            }
            if (newdata.AlertNames.Count() < 1)
            {
                return false;
            }
            if (newdata.AlertJobsQueue == null)
            {
                return false;
            }

            // Check if HR is up before calling HR routines
            var hrResponse = Helper.GetHRServerStatus(configuration);
            // We expect a 400 - Bad Request, if 404 Not Found, return an error
            if (hrResponse.StatusCode == 404)
            {
                return false;
            }

            return true;
        }

        public AlertJobsQueue DeleteJobQueueEntry(AlertJobsQueue alertQObject)
        {

            // Delete the entity Record first

            var targetObjects = _context.AlertJobsQueueEntity.Where(t => t.AlertJobsQueueID == alertQObject.AlertJobsQueueID);
            if (targetObjects == null)
            {
                return null;
            }
            foreach(var tObject in targetObjects)
            {
                _context.AlertJobsQueueEntity.Remove(tObject);
            }
            _context.SaveChanges();

            _context.AlertJobsQueue.Remove(alertQObject);

            _context.SaveChanges();

            return alertQObject;

        }

    }
}

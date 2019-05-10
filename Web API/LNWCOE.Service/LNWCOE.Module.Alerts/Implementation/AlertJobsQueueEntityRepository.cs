using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Models.Alerts;
using LNWCOE.Models.Context;
using LNWCOE.Models.HR;
using LNWCOE.Module.Alerts.Interface;
using LNWCOE.Service.Helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Repository.DataAccess;

namespace LNWCOE.Module.Alerts.Implementation
{
    public class AlertJobsQueueEntityRepository : Repository<AlertJobsQueueEntity>, IAlertJobsQueueEntityRepository
    {
        private new readonly EditorialDataContext _context;

        public AlertJobsQueueEntityRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }
        /// <summary>
        /// This is the left navigation pane for Alerts.  
        /// Items are grouped by Job, then by Day 
        /// </summary>
        /// <returns></returns>
        public object GetAlertBatchItems()
        {
            var navall = _context.AlertJobsNav.AsNoTracking().FromSql($"usp_AlertGetNavigation_sel").ToList();

            var NavData = (from byJob in navall
                           group byJob by (byJob.Job) into Grouping
                           select new
                           {
                               label = Grouping.Key,
                               //AlertJobQueueID = Grouping.Key.AlertJobsQueueID,
                               //AlertJobQueueID = Grouping.Key.get
                               children = from byDueday in Grouping
                                          group byDueday by
                                          new { DueDay = byDueday.Due.ToString("MM/dd/yyyy"), byDueday.AlertJobsQueueID }
                                          into SubGrouping
                                          select new
                                          {
                                              label = SubGrouping.Key.DueDay + " (" + SubGrouping.Count() + ")",
                                              data = new
                                              {
                                                  Due = SubGrouping.Key.DueDay,
                                                  AlertJobQueueID = SubGrouping.Key.AlertJobsQueueID,
                                                  Grouping.Key
                                              }
                                          }
                           });
            return NavData;
        }

        public object GetAlertBatchItems_v1()
        {
            var navall = _context.AlertJobsNav_v1.AsNoTracking().FromSql($"usp_AlertGetNavigation_v1_sel").ToList();

            var NavData = (from byCountry in navall
                           group byCountry by new { byCountry.CountryName, byCountry.CountryID } into Grouping
                           select new
                           {
                               label = Grouping.Key.CountryName,
                               data = new {
                                   Grouping.Key.CountryID,
                                   AlertJobsID = 0,
                                   JobName = "",
                               },
                               children = from byJob in Grouping
                                          group byJob by
                                          new { byJob.AlertJobsID, byJob.JobName }
                                          into SubGrouping
                                          select new
                                          {
                                              label = SubGrouping.Key.JobName,
                                              data = new  {
                                                  SubGrouping.Key.AlertJobsID,
                                              },
                                              children = new
                                              {
                                                  Grouping.Key.CountryName,
                                                  Grouping.Key.CountryID,
                                                  SubGrouping.Key.AlertJobsID,
                                                  SubGrouping.Key.JobName
                                              }
                                          }
                           });
            return NavData;
        }


        /// <summary>
        /// Right Pane navigation for Alerts displays Alerts information locks and dates
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        public IEnumerable<AlertJobFilterData> GetFilteredAlertEntities(AlertJobFilter filter)
        {
            var AlertJobQueueID = filter.AlertJobQueueID;
            var DueDate = filter.DueDate;

            var result = _context.AlertJobFilterData
                .AsNoTracking()
                .FromSql(@"usp_GetAlertEntries_sel @AlertJobQueueID={0}, @DueDate={1}", AlertJobQueueID, DueDate)
                .Select(pg => new AlertJobFilterData
                {
                    AlertJobsQueueID = pg.AlertJobsQueueID,
                    Job = pg.Job,
                    JobURL = pg.JobURL,
                    Due = pg.Due,
                    Alert = pg.Alert,
                    AlertDescription = pg.AlertDescription,
                    Created = pg.Created,
                    AlertJobEntityID = pg.AlertJobEntityID,
                    WorkItemID = pg.WorkItemID,
                    Status = pg.Status,
                    Locked = pg.Locked
                });

            return result;
        }

        public IEnumerable<AlertJobFilterData_v1> GetFilteredAlertEntities_v1(AlertJobFilter_v1 filter, string SuperUserId)
        {
            int RecipientID = Int32.Parse(SuperUserId);

            int NameID = 0; // Used in the usp_GetJobAlertsForQueue_By_Recipient_Job, putting a value to make the SP execute

            int CountryID  = filter.CountryID;
            int AlertJobsID = filter.AlertJobsID;

            var result = _context.AlertJobFilterData_v1
                .AsNoTracking()
                .FromSql(@"usp_GetJobAlertsForQueue_By_Recipient_Job @RecipientID={0}, @JobID={1}, @CountryID={2}, @NameID={3} ", 
                    RecipientID, 
                    AlertJobsID,
                    CountryID,
                    NameID
                    )
                .Select(pg => new AlertJobFilterData_v1
                {
                    PkJobID = pg.PkJobID,
                    JobName = pg.JobName,
                    JobUrl = pg.JobUrl,
                    OpenJobCount = pg.OpenJobCount,
                    AlertNameID = pg.AlertNameID,
                    fkCountryID = pg.fkCountryID,
                    Country = pg.Country,
                    NameEntry = pg.NameEntry,
                    EditTypeID = pg.EditTypeID,
                    DispositionTypeID = pg.DispositionTypeID,
                    fkRecipientID = pg.fkRecipientID,
                    DispositionUser = pg.DispositionUser,
                    EmailPoolDateCreated = pg.EmailPoolDateCreated,
                    EmailKey = pg.EmailKey,
                    EmailKeyNext = pg.EmailKeyNext,
                    Completed = pg.Completed
                });

            return result;
        }

        public AlertJobsQueueEntityData GetByGuid(Guid guid)
        {
            var alertJobEntity = _context.AlertJobsQueueEntity
                .Where(x => x.WorkItemID == guid)
                .FirstOrDefault();

            if (alertJobEntity == null)
            {
                return null;
            }

            var alertName = _context.AlertNames
                .Where(x => x.AlertNameID == alertJobEntity.AlertNameID)
                .FirstOrDefault();

            if (alertName == null)
            {
                return null;
            }

            var alertJob = _context.AlertJobs
               .Where(x => x.AlertJobsID == alertName.AlertJobsID)
               .FirstOrDefault();

            if (alertJob == null)
            {
                return null;
            }

            var locks = _context.RecordLocks
                .Where(x => x.IDFromWorkUnitsDBTable == alertJobEntity.AlertJobsQueueEntityID)
                .FirstOrDefault();

            AppUser lockedTo = new AppUser();

            if (locks != null)
            {
                lockedTo = _context.AppUser
                    .Where(x => x.AppUserID == locks.AppUserID)
                    .FirstOrDefault();
            }
            else
            {
                lockedTo = null;
            }

            AlertJobsQueueEntityData alertJobEntityData = new AlertJobsQueueEntityData
            {
                AlertJobsQueueEntity = alertJobEntity,
                AlertNames = alertName,
                AlertJobs = alertJob,
                LockedTo = lockedTo
            };

            return alertJobEntityData;
        }

        public AlertJobsQueueEntityData GetByGuid_v1(Guid guid)
        {
            var alertJobEntity = _context.AlertJobsQueueEntity
                .Where(x => x.WorkItemID == guid)
                .FirstOrDefault();

            if (alertJobEntity == null)
            {
                return null;
            }

            var alertName = _context.AlertNames
                .Where(x => x.AlertNameID == alertJobEntity.AlertNameID)
                .FirstOrDefault();

            if (alertName == null)
            {
                return null;
            }

            var alertJob = _context.AlertJobs
               .Where(x => x.AlertJobsID == alertName.AlertJobsID)
               .FirstOrDefault();

            if (alertJob == null)
            {
                return null;
            }

            var locks = _context.AlertNamesDisposition
                .Where(x => x.AlertNamesDispositionID == alertName.AlertNameID)
                .FirstOrDefault();

            AppUser lockedTo = new AppUser();

            if (locks != null)
            {
                lockedTo = _context.AppUser
                    .Where(x => x.AppUserID == locks.AppUserID)
                    .FirstOrDefault();
            }
            else
            {
                lockedTo = null;
            }

            AlertJobsQueueEntityData alertJobEntityData = new AlertJobsQueueEntityData
            {
                AlertJobsQueueEntity = alertJobEntity,
                AlertNames = alertName,
                AlertJobs = alertJob,
                LockedTo = lockedTo
            };

            return alertJobEntityData;
        }


        public AlertJobsQueueEntity UpdateEntry(AlertJobsQueueEntityDataSave updatedata, IConfiguration configuration)
        {

            bool DataValid = ValidateAlertEntityQueueDataForUpdate(updatedata, configuration);
            if (DataValid == false)
            {
                return null;
            }

            AlertJobsQueueEntity thisEntityObject = updatedata.AlertJobsQueueEntity;

            var AlertJobsQueueEntityObject = _context.AlertJobsQueueEntity
                .FirstOrDefault(t => t.AlertJobsQueueEntityID == thisEntityObject.AlertJobsQueueEntityID);
            // check if object exists
            if (AlertJobsQueueEntityObject == null)
            {
                return null;
            }
            // status can only be 26, "Open" fail otherwise
            if(!(AlertJobsQueueEntityObject.StatusID == 26))
            {
                return null;
            }


            var thisUser = _context.AppUser
                .FirstOrDefault(t => t.AppUserID.ToString() == thisEntityObject.UpdatedBy);

            if (thisUser == null)
            {
                return null;
            }

            // Check the locks table
            // WorkUnitTypeID == 6 is BWQ, 3 is Investigations, 4 Alerts
            var locks = _context.RecordLocks
                .Where(v => v.WorkUnitTypeID == 4
                && v.IDFromWorkUnitsDBTable == thisEntityObject.AlertJobsQueueEntityID);

            foreach (var lockentry in locks)
            {
                if (lockentry.AppUserID != thisUser.AppUserID) // record lock found for another user
                {
                    return null;
                }
                if (lockentry != null)
                {
                    _context.RecordLocks.Remove(lockentry); // clear locks before saving
                }
            }

            _context.Entry(AlertJobsQueueEntityObject).CurrentValues.SetValues(thisEntityObject); // Save Editorial data
            _context.SaveChanges();

            #region Human Review
            var workItemGuid = AlertJobsQueueEntityObject.WorkItemID.ToString();
        
            var QueueGuid = (from module in _context.ApplicationModules 
                             where module.ModuleName == EditorialModules.Alerts
                             select module.QueueGuid).FirstOrDefault();

            var QueueGuidString = QueueGuid.ToString();

            var JsonData = JsonConvert.SerializeObject(thisEntityObject);

            var HRCreateRequest = Helper.BuildHRWorkItemRequest(EditorialModules.Alerts,
                   QueueGuidString, JsonData,
                   configuration, workItemGuid, HRRequestMode.Update); 

            var GuidResult = Helper.PutHRWorkItem((WorkItemPutRequest)HRCreateRequest, updatedata.HRToken, configuration);

            #endregion

            return thisEntityObject;
        }

        public object CheckWorkItemIDForEntity(WorkItemPostData postData, IConfiguration configuration)
        {
            bool DataValid = ValidateAlertEntityQueueData(postData, configuration);
            if (DataValid == false)
            {
                return null;
            }
            var token = postData.Token;

            // check for WorkItemID
            var AlertEntityEntry = _context.AlertJobsQueueEntity
                .Where(t => t.AlertJobsQueueEntityID == postData.ModuleTableEntryID);

            if(AlertEntityEntry.Count() < 1)
            {
                return null;
            }

            //check if there is an existing WorkItemGuid previously defined
            var DefinedWorkItemGuid = (from alertentityentry in AlertEntityEntry
                                       where alertentityentry.WorkItemID != null
                                       select alertentityentry.WorkItemID).FirstOrDefault().ToString();
            int WorkItemCount = 0;
            Guid GuidToSet;

            if (DefinedWorkItemGuid != "") // Alert Entity has a WorkItemGuid
            {
                GuidToSet = new Guid(DefinedWorkItemGuid.ToString());
            }
            else // Perform HR routine and create a WorkItemGuid
            {
                var Modules = _context.ApplicationModules;
                var QueueGuid = (from mods in Modules
                                 where mods.ModuleName == EditorialModules.Alerts
                                 select mods.QueueGuid).FirstOrDefault();
                var QueueGuidString = QueueGuid.ToString();

                var JsonData = JsonConvert.SerializeObject(AlertEntityEntry);

                var HRCreateRequest = Helper.BuildHRWorkItemRequest(EditorialModules.Alerts,
                    QueueGuidString, JsonData,
                    configuration, null, HRRequestMode.Create);

                var returnGuid = Helper.GetHRWorkItem((WorkItemRequest)HRCreateRequest, token, configuration); 

                if (returnGuid.Value.workItemGuid == null)
                {
                    return null;
                }

                GuidToSet = new Guid(returnGuid.Value.workItemGuid);
            }

            foreach (var alertentityentry in AlertEntityEntry)
            {
                if (alertentityentry.WorkItemID == null)
                {
                    WorkItemCount += 1;

                    alertentityentry.WorkItemID = GuidToSet;
                }
            }

            if (WorkItemCount > 0)
            {
                _context.SaveChanges();
            }

            return (new { WorkItemGuid = GuidToSet });

        }

        public object CheckWorkItemIDForEntity_v1(WorkItemPostData postData, IConfiguration configuration)
        {
            bool DataValid = ValidateAlertEntityQueueData(postData, configuration);
            if (DataValid == false)
            {
                return null;
            }
            var token = postData.Token;

            // check for WorkItemID
            var AlertEntityEntry = _context.AlertJobsQueueEntity
                .Where(t => t.AlertNameID == postData.ModuleTableEntryID);

            //check if there is an existing WorkItemGuid previously defined
            var DefinedWorkItemGuid = (from alertentityentry in AlertEntityEntry
                                       where alertentityentry.WorkItemID != null
                                       select alertentityentry.WorkItemID).FirstOrDefault().ToString();
            //int WorkItemCount = 0;
            Guid GuidToSet;

            if (DefinedWorkItemGuid != "") // Alert Entity has a WorkItemGuid
            {
                GuidToSet = new Guid(DefinedWorkItemGuid.ToString());
            }
            else // Perform HR routine and create a WorkItemGuid
            {
                var Modules = _context.ApplicationModules;
                var QueueGuid = (from mods in Modules
                                 where mods.ModuleName == EditorialModules.Alerts
                                 select mods.QueueGuid).FirstOrDefault();
                var QueueGuidString = QueueGuid.ToString();

                var JsonData = JsonConvert.SerializeObject(AlertEntityEntry);

                var HRCreateRequest = Helper.BuildHRWorkItemRequest(EditorialModules.Alerts,
                    QueueGuidString, JsonData,
                    configuration, null, HRRequestMode.Create);

                var returnGuid = Helper.GetHRWorkItem((WorkItemRequest)HRCreateRequest, token, configuration);

                if (returnGuid.Value.workItemGuid == null)
                {
                    return null;
                }

                GuidToSet = new Guid(returnGuid.Value.workItemGuid);

                // add an entry to the mapping table [AlertJobsQueueEntity]

                AlertJobsQueueEntity NewAlertJobsQueueEntity = new AlertJobsQueueEntity
                {
                    AlertNameID = postData.ModuleTableEntryID,
                    WorkItemID = GuidToSet,
                    AlertJobsQueueID = 0, // not used for now
                    StatusID = 0, // not used for now
                    DateCreatedUTC = DateTime.UtcNow,
                    LastUpdatedUTC = DateTime.UtcNow,
                    CreatedBy = postData.Appuserid.ToString(),
                    UpdatedBy = postData.Appuserid.ToString()
                };

                _context.AlertJobsQueueEntity.Add(NewAlertJobsQueueEntity);
                _context.SaveChanges();

            }

            return (new { WorkItemGuid = GuidToSet });

        }

        public object LockAlert()
        {
            return null;
        }

        public object UnlockAlert()
        {
            return null;
        }

        private bool ValidateAlertEntityQueueDataForUpdate(AlertJobsQueueEntityDataSave updatedata, IConfiguration configuration)
        {
            var HRToken = new JwtSecurityToken(updatedata.HRToken);

            if (Helper.TokenValid(HRToken) == false)
            {
                return false;
            }
            
            if(updatedata.AlertJobsQueueEntity == null)
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

        private bool ValidateAlertEntityQueueData(WorkItemPostData newdata, IConfiguration configuration)
        {

            var HRToken = new JwtSecurityToken(newdata.Token);

            if (Helper.TokenValid(HRToken) == false)
            {
                return false;
            }
            if (newdata.ModuleTableEntryID == 0)
            {
                return false;
            }
            if (newdata.Token == "")
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

        public object LockAlert(int AlertNameID, int AppUserID)
        {
            throw new NotImplementedException();
        }

        public object UnlockAlert(int AlertNameID, int AppUserID)
        {
            throw new NotImplementedException();
        }
    }
}

using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LNWCOE.Data;
using LNWCOE.Models.ALERTS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using System;
using LNWCOE.Helpers;
using Newtonsoft.Json;
using LNWCOE.Models.HRData;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using LNWCOE.Models.Admin;

namespace LNWCOE.Modules.ALERTS
{
    [Produces("application/json")]
    [Route("api/AlertJobsQueueEntity")]
    [Authorize]
    public class AlertJobsQueueEntityController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<AlertJobsQueueEntityController> _logger;
        private IConfiguration _configuration;

        public AlertJobsQueueEntityController(AppDbContext context, ILogger<AlertJobsQueueEntityController> logger, IConfiguration configuration)
        {
            this._context = context;
            this._logger = logger;
            this._configuration = configuration;
        }

        [HttpGet]
        public IEnumerable<AlertJobsQueueEntity> Get()
        {
            var ret = _context.AlertJobsQueueEntity.ToList();
            return ret;
        }

        [HttpGet("nav")]
        public JsonResult GetAlertBatchItems()
        {
            var navall = _context.AlertJobsNav.AsNoTracking().FromSql($"usp_AlertGetNavigation_sel").ToList();

            var NavData = (from byJob in navall
                               //group byJob by new { byJob.Job, byJob.AlertJobsQueueID } into Grouping
                           group byJob by byJob.Job into Grouping
                           //orderby Grouping.Key
                           select new
                           {
                               label = Grouping.Key,
                               children = from byDueday in Grouping
                                          group byDueday by
                                          new { DueDay = byDueday.Due.ToString("MM/dd/yyyy"), byDueday.AlertJobsQueueID }
                                          into SubGrouping
                                          //orderby SubGrouping.Key
                                          select new
                                          {
                                              label = SubGrouping.Key.DueDay + " (" + SubGrouping.Count() + ")",
                                              data = new
                                              {
                                                  Due = SubGrouping.Key.DueDay,
                                                  AlertJobQueueID = SubGrouping.Key.AlertJobsQueueID,
                                                  Job = Grouping.Key
                                              }
                                          }
                           }).ToList();

            return Json(NavData);
        }

        [HttpPost("filter")]
        public JsonResult GetAlertEntitiesFilter([FromBody] AlertJobFilter filter)
        {
            if (ModelState.IsValid && filter != null)
            {
                var AlertJobQueueID = filter.AlertJobQueueID;
                var DueDate = filter.DueDate;

                var result = _context.AlertJobFilterData
                    .FromSql($"usp_GetAlertEntries_sel @AlertJobQueueID={AlertJobQueueID}, @DueDate={DueDate} ")
                    .Select(pg => new AlertJobFilterData
                    {
                        AlertJobsQueueID = pg.AlertJobsQueueID,
                        Job = pg.Job,
                        Due = pg.Due,
                        Alert = pg.Alert,
                        AlertDescription = pg.AlertDescription,
                        Created = pg.Created,
                        AlertJobEntityID = pg.AlertJobEntityID,
                        WorkItemID = pg.WorkItemID,
                        Status = pg.Status,
                        Locked = pg.Locked
                    }).ToList();

                return Json(result);
            }

            return Json("No Data");
        }

        [HttpPost("wrkitem")]
        public JsonResult CheckWorkItemIDForEntity([FromBody] WorkItemPostData postData)
        {
            if (!ModelState.IsValid)
            {
                var badrequest = new
                {
                    Success = false,
                    Message = "Error in Input"
                };
                return Json(badrequest);
            }

            // Check if HR is up
            var hruri = _configuration.GetSection("HumanReview:uri").Value + "auth/token";
            var hrResponse = Common.ServerStatusBy(hruri);

            // We expect a 400 - Bad Request, anything else specifically 404 Not Found, return an error
            if (hrResponse.StatusCode == 404)
            {
                { return Json("Error: Human Review Service unavailable"); }
            }

            var Message = "";

            if (postData.ModuleTableEntryID == 0)
            {
                Message = "No Alert Entry given";
                return Json(Message);
            }

            if (postData.token == "")
            {
                Message = "No token given";
                return Json(Message);
            }

            var token = postData.token;

            // check for WorkItemID
            var AlertEntityEntry = _context.AlertJobsQueueEntity
                .Where(t => t.AlertJobsQueueEntityID == postData.ModuleTableEntryID);

            //check if there is an existing WorkItem previously defined
            var DefinedWorkItemGuid = (from alertentityentry in AlertEntityEntry
                                       where alertentityentry.WorkItemID != null
                                       select alertentityentry.WorkItemID).FirstOrDefault().ToString();

            int WorkItemCount = 0;
            ReturnData retValue;

            Guid GuidToSet;

            if (DefinedWorkItemGuid != "")
            {
                GuidToSet = new Guid(DefinedWorkItemGuid.ToString());
            }
            else
            {
                var Modules = _context.ApplicationModules;
                var QueueGuid = (from mods in Modules
                                 where mods.ModuleName == "Alerts"
                                 select mods.QueueGuid).FirstOrDefault();

                var JsonData = JsonConvert.SerializeObject(AlertEntityEntry);

                WorkItemRequest req = new WorkItemRequest();
                req.name = "Created WorkItem for Alert Entity " + postData.ModuleTableEntryID;
                req.description = "Created WorkItem for Alert Entity " + postData.ModuleTableEntryID;
                req.queueGuid = QueueGuid;
                req.statusDetailTypeGuid = _configuration.GetSection("HumanReview:statusDetailTypeGuid_ins").Value;
                req.reviewTypeGuid = _configuration.GetSection("HumanReview:reviewTypeGuid_ins").Value;
                req.formDefinitionJson = JsonData;
                req.isActive = true;

                var returnGuid = Common.getWorkItemAsync(req, token, _configuration);
                // workitem here

                if (returnGuid.value.workItemGuid == null)
                {
                    var workitemnotcreated = new
                    {
                        Success = false,
                        Message = "WorkItem not created"
                    };
                    return Json(workitemnotcreated);
                    // TODO: LOG THIS ERROR
                }

                GuidToSet = new Guid(returnGuid.value.workItemGuid);
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
                retValue = _context.SaveData();

                if (retValue.Message != "Success")
                { return Json(retValue); }
            }


            return Json(new { WorkItemGuid = GuidToSet });
        }

        [HttpGet("guid/{guid}")]
        public JsonResult GetByGuid(Guid guid)
        {
            var alertJobEntity = _context.AlertJobsQueueEntity
                .Where(x => x.WorkItemID == guid)
                .FirstOrDefault();

            if (alertJobEntity == null)
            {
                { return Json("Undefined Alert Job Entity"); }
            }

            var alertName = _context.AlertNames
                .Where(x => x.AlertNameID == alertJobEntity.AlertNameID)
                .FirstOrDefault();

            if (alertName == null)
            {
                { return Json("Undefined Alert Name for this Entity"); }
            }

            var alertJob = _context.AlertJobs
               .Where(x => x.AlertJobsID == alertName.AlertJobsID)
               .FirstOrDefault();

            if (alertJob == null)
            {
                { return Json("Undefined Alert Job for this Entity"); }
            }

            var locks = _context.RecordLocks
                .Where(x => x.IDFromWorkUnitsDBTable == alertJobEntity.AlertJobsQueueEntityID)
                .FirstOrDefault();

            AppUser lockedTo = new AppUser();

            if(locks != null)
            {
                lockedTo = _context.AppUser
                    .Where(x => x.AppUserID == locks.AppUserID)
                    .FirstOrDefault();
            }
            else
            {
                lockedTo = null;
            }

            AlertJobsQueueEntityData alertJobEntityData = new AlertJobsQueueEntityData { AlertJobsQueueEntity = alertJobEntity,
                AlertNames = alertName,
                AlertJobs = alertJob,
                LockedTo = lockedTo
            };

            var returnData = Json(alertJobEntityData);

            return returnData;
        }

        [HttpPut]
        public IActionResult UpdateEntry([FromBody] AlertJobsQueueEntityDataSave updatedata)
        {
            AlertJobsQueueEntity thisentity = updatedata.AlertJobsQueueEntity;

            if (updatedata.HRToken == "")
            { return BadRequest("Invalid Token"); }
            
            var targetObject = _context.AlertJobsQueueEntity
                .FirstOrDefault(t => t.AlertJobsQueueEntityID == thisentity.AlertJobsQueueEntityID);
            if (targetObject == null)
            { return NotFound(); }

            var thisUser = _context.AppUser
                .FirstOrDefault(t => t.AppUserID.ToString() == thisentity.UpdatedBy);

            if (thisUser == null)
            { return BadRequest("Invalid User"); }

            // Check if HR is up
            var hruri = _configuration.GetSection("HumanReview:uri").Value + "auth/token";
            var hrResponse = Common.ServerStatusBy(hruri);

            // We expect a 400 - Bad Request. Anything else specifically 404 Not Found, return an error
            if (hrResponse.StatusCode == 404)
            {
                { return NotFound("Error: Human Review Service unavailable"); }
            }
            
            // WorkUnitTypeID == 6 is BWQ, 3 is Investigations, 4 Alerts
            var thislock = _context.RecordLocks
                .Where(v => v.WorkUnitTypeID == 4
                && v.IDFromWorkUnitsDBTable == thisentity.AlertJobsQueueEntityID);

            foreach (var locks in thislock)
            {
                if (locks.AppUserID != thisUser.AppUserID) // record lock found for another user
                {
                    var lockedToUser = _context.AppUser.FirstOrDefault(u => u.AppUserID == locks.AppUserID);

                    return BadRequest("Investigation locked to: " + lockedToUser.AppUserName);
                }

                if (locks != null) // no locks
                {
                    _context.RecordLocks.Remove(locks);
                }
            }

            _context.Entry(targetObject).CurrentValues.SetValues(thisentity); // Save Editorial data

            ReturnData ret;
            ret = _context.SaveData();

            if (ret.Message != "Success")
            { return Json(ret); }

            #region Human Review
            try
            {
                var workItemGuid = targetObject.WorkItemID.ToString();
                var Modules = _context.ApplicationModules;
                var QueueGuid = (from mods in Modules
                                 where mods.ModuleName == "Alerts"
                                 select mods.QueueGuid).FirstOrDefault();

                var JsonData = JsonConvert.SerializeObject(thisentity);

                WorkItemPutRequest HRPutRequest = new WorkItemPutRequest();
                HRPutRequest.isActive = true;
                HRPutRequest.name = "Updating WorkItem details for Alert Entity " + thisentity.AlertJobsQueueEntityID;
                HRPutRequest.description = "Updating WorkItem details for Alert Entity " + thisentity.AlertJobsQueueEntityID;
                HRPutRequest.queueGuid = QueueGuid;
                HRPutRequest.statusDetailTypeGuid = _configuration.GetSection("HumanReview:statusDetailTypeGuid_upd").Value;
                HRPutRequest.reviewTypeGuid = _configuration.GetSection("HumanReview:reviewTypeGuid_upd").Value;
                HRPutRequest.formDefinitionJson = JsonData;
                HRPutRequest.workitemGuid = workItemGuid;

                var returnDataFromHR = Common.putWorkItemForEntityAsync(HRPutRequest, updatedata.HRToken, _configuration);
            }
            catch (Exception e)
            {
                // log error 
                var logInfo = e.Message;

            }
            #endregion

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }
    }
}
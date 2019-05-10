using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LNWCOE.Data;
using LNWCOE.Models.ALERTS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using System;
using LNWCOE.Models.BWQ;
using LNWCOE.Helpers;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using LNWCOE.Models.HRData;
using Microsoft.EntityFrameworkCore;

namespace LNWCOE.Modules.ALERTS
{
    [Produces("application/json")]
    [Route("api/AlertJobsQueue")]
    [Authorize]
    public class AlertJobsQueueController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<AlertJobsQueueController> _logger;
        private IConfiguration _configuration;

        public AlertJobsQueueController(AppDbContext context, ILogger<AlertJobsQueueController> logger, IConfiguration configuration)
        {
            this._context = context;
            this._logger = logger;
            this._configuration = configuration;
        }

        [HttpGet]
        public IEnumerable<AlertJobsQueue> Get()
        {
            var ret = _context.AlertJobsQueue.Where(x => x.StatusCollectionItemID == 1047).ToList();
            return ret;
        }

        [HttpGet("{id}")]
        public AlertJobsQueue Get(int id)
        {
            var ret = _context.AlertJobsQueue.FirstOrDefault(x => x.AlertJobsQueueID == id);
            return ret;
        }

        [HttpGet("job/{id}")]
        public List<AlertJobsQueue> GetByJobID(int id)
        {
            var ret = _context.AlertJobsQueue.Where(x => x.AlertJobsID == id).ToList();
            return ret;
        }

        [HttpGet("priority")]
        public List<CollectionItem> GetAlertPriority()
        {
            var ret = _context.CollectionItem.Where(x => x.CollectionID == 15).ToList();
            return ret;
        }

        [HttpGet("status")]
        public List<CollectionItem> GetAlertStatus()
        {
            var ret = _context.CollectionItem.Where(x => x.CollectionID == 14).ToList();
            return ret;
        }

        [HttpGet("disposition")]
        public List<CollectionItem> GetAlertDisposition()
        {
            var ret = _context.CollectionItem.Where(x => x.CollectionID == 8).ToList();
            return ret;
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            ReturnData ret = null;

            try
            {
                //remove entities first
                foreach (var qdata in _context.AlertJobsQueueEntity.Where(x => x.AlertJobsQueueID == id))
                {
                    _context.AlertJobsQueueEntity.Remove(qdata);
                }

                ret = _context.SaveData();
                if (ret.Message != "Success")
                {
                    return NotFound(ret);
                }

                var todelete = _context.AlertJobsQueue.FirstOrDefault(t => t.AlertJobsQueueID == id);
                _context.AlertJobsQueue.Remove(todelete);

                ret = _context.SaveData();
            }
            catch (Exception e)
            {
                var loginfo = e.Message;
                ret.Message = "Failed to deleted data";
                ;
            }


            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpGet("close/{id}")]
        public IActionResult CloseAlertBatch(int id)
        {
            var toclose = _context.AlertJobsQueue.Where(x => x.AlertJobsQueueID == id).FirstOrDefault();

            if (toclose == null)
            { return NotFound(); }

            toclose.StatusCollectionItemID = 1048;
            // Alerts settings CollectionItem, CollectionID 1047 is open, 1048 is closed

            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPost]
        public IActionResult Create([FromBody] AlertJobsQueueData newmodel)
        {
            if (!ModelState.IsValid)
            {
                { return NotFound(); }
            }

            if (newmodel.HRToken.Trim() == "")
            {
                { return NotFound("Invalid Token"); }
            }
            if (newmodel.AlertNames.Count() < 1)
            {
                return BadRequest("No Alert Names found");
            }
            if (newmodel.AlertJobsQueue == null)
            {
                return BadRequest("No Alert Job found");
            }

            // Check if HR is up
            var hruri = _configuration.GetSection("HumanReview:uri").Value + "auth/token";
            var hrResponse = Common.ServerStatusBy(hruri);

            // We expect a 400 - Bad Request, anything else specifically 404 Not Found, return an error
            if (hrResponse.StatusCode == 404)
            {
                { return NotFound("Error: Human Review Service unavailable"); }

            }

            AlertJobsQueue alertJobQueue = newmodel.AlertJobsQueue;
            List<AlertNames> alertNames = newmodel.AlertNames;
            ReturnData retValue = null;

            int alertJobsQueueID = 0;
            var identity = alertJobQueue.CreatedBy;

            try
            {
                var returnObject = _context.AlertJobsQueue.Add(alertJobQueue);
                _context.SaveChanges();

                // check id of new Batch contained in alertJobQueue
                alertJobsQueueID = alertJobQueue.AlertJobsQueueID;
                var todayUtc = DateTime.UtcNow;

                foreach (var alertname in alertNames)
                {
                    var newAlertEntity = new AlertJobsQueueEntity();
                    newAlertEntity.AlertNameID = alertname.AlertNameID;
                    newAlertEntity.AlertJobsQueueID = alertJobsQueueID; // created above
                    newAlertEntity.CreatedBy = identity;
                    newAlertEntity.UpdatedBy = identity;
                    newAlertEntity.DateCreatedUTC = todayUtc;
                    newAlertEntity.LastUpdatedUTC = todayUtc;
                    newAlertEntity.StatusID = 26; // Newly Created, based in CollectionItem, CollectionID
                    //newAlertEntity.WorkItemID
                    _context.AlertJobsQueueEntity.Add(newAlertEntity);
                }
                _context.SaveChanges();

            }
            catch (Exception e)
            {
                var loginfo = e.Message;
                ;
            }

            // Human Review
            #region Human Review Entries

            var AlertEntities = _context.AlertJobsQueueEntity.Where(t => t.AlertJobsQueueID == alertJobsQueueID);
            var Modules = _context.ApplicationModules;
            var QueueGuid = (from mods in Modules
                             where mods.ModuleName == "Alerts"
                             select mods.QueueGuid).FirstOrDefault();
            try
            {


                foreach (var alertentity in AlertEntities)
                {
                    var JsonData = JsonConvert.SerializeObject(alertentity);

                    WorkItemRequest HRCreateRequest = new WorkItemRequest();
                    HRCreateRequest.name = "Created WorkItem for Alert Entity " + alertentity.AlertJobsQueueEntityID;
                    HRCreateRequest.description = "Created WorkItem for Alert Entity " + alertentity.AlertJobsQueueEntityID;
                    HRCreateRequest.queueGuid = QueueGuid;
                    HRCreateRequest.statusDetailTypeGuid = _configuration.GetSection("HumanReview:statusDetailTypeGuid_ins").Value;
                    HRCreateRequest.reviewTypeGuid = _configuration.GetSection("HumanReview:reviewTypeGuid_ins").Value;
                    HRCreateRequest.formDefinitionJson = JsonData;
                    HRCreateRequest.isActive = true;

                    var returnGuid = Common.getWorkItemAsync(HRCreateRequest, newmodel.HRToken, _configuration);

                    if (returnGuid.value.workItemGuid == null)
                    {
                        var workitemnotcreated = new
                        {
                            Success = false,
                            Message = "WorkItem not created"
                        };



                        return Json(workitemnotcreated);
                    }

                    alertentity.WorkItemID = new Guid(returnGuid.value.workItemGuid);
                }

                retValue = _context.SaveData();
                if (retValue.Message == "Success")
                { return Ok(retValue); } // return error if workitemid was not updated for this entity

            }
            catch (Exception e)
            {
                var loginfo = e.Message;
                var iactdelete = Delete(alertJobsQueueID);
            }



            #endregion

            { return BadRequest(retValue); }

        }

        [HttpGet("nav")]
        public List<AlertJobData> GetAlertBatches()
        {
            var data = _context.AlertJobData.AsNoTracking().FromSql($"usp_AlertsGetBatches_sel")
               .Select(navdata => new AlertJobData
               {
                   AlertJobsQueueID = navdata.AlertJobsQueueID,
                   Description = navdata.Description,
                   Status = navdata.Status,
                   Created = navdata.Created,
                   Due = navdata.Due,
                   Priority = navdata.Priority,
                   Total = navdata.Total,
                   Remaining = navdata.Remaining
               }).ToList();



            return data;
        }

    }
}
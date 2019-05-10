using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LNWCOE.Data;
using LNWCOE.Models.News;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using LNWCOE.Helpers;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using LNWCOE.Models.HRData;
using System;

namespace LNWCOE.Modules.NEWS
{
    [Produces("application/json")]
    [Route("api/News/FeedItemQueue")]
    [Authorize]
    public class FeedItemQueueController : Controller
    {
        private readonly NEWSDBContext _NewsDBcontext;
        private readonly AppDbContext _context;
        //private readonly ILogger<FeedItemQueueController> _logger;
        private IConfiguration _configuration;

        public FeedItemQueueController(NEWSDBContext NewsDBcontext, AppDbContext context, IConfiguration configuration)
        {
            this._NewsDBcontext = NewsDBcontext;
            this._context = context;
            _configuration = configuration;
        }

        [HttpGet]
        public IEnumerable<FeedItemQueue> Get()
        {
            var ret = _NewsDBcontext.FeedItemQueue.ToList();
            return ret;
        }

        [HttpGet("{id}", Name = "GetFeedItemQueue")]
        public FeedItemQueue Get(int id)
        {
            var ret = _NewsDBcontext.FeedItemQueue.FirstOrDefault(x => x.id == id);
            return ret;
        }

        [HttpPut]
        public IActionResult UpdateEntry([FromBody] NewsDataSave objupdate)
        {
            var HRtoken = objupdate.HRToken;
            var FeedItemQueueObject = objupdate.FeedItemQueue;
            var WorkItemGuid = objupdate.WorkItemGuid;
            
            var Message = "";

            // Check if HR is up
            var hruri = _configuration.GetSection("HumanReview:uri").Value + "auth/token";
            var hrResponse = Common.ServerStatusBy(hruri);

            // We expect a 400 - Bad Request. Anything else specifically 404 Not Found, return an error
            if (hrResponse.StatusCode == 404)
            {
                { return NotFound("Error: Human Review Service unavailable"); }
            }

            if (HRtoken == null || FeedItemQueueObject == null || WorkItemGuid == null)
            {
                Message = "Invalid Request";
                return BadRequest(Message);
            }

            var MappingEntry = _context.HRWorkItemDataMap
                .Where(t => t.WorkItemID == WorkItemGuid && t.WorkUnitTypeID == 5)
                .FirstOrDefault();
            /*
            3	Investigation
            4	Alerts
            5	News Queue
            6	BWQ
            */
            if (MappingEntry == null)
            {
                Message = "Work Item not found";
                return BadRequest(Message);
            }

            var FeedItemQueueEntry = _NewsDBcontext.FeedItemQueue
               .Where(t => t.id == FeedItemQueueObject.id)
               .FirstOrDefault();

            if (FeedItemQueueEntry == null)
            {
                Message = "Item entry does not exist";
                return BadRequest(Message);
            }

            var AppUserId = FeedItemQueueEntry.stateChangedRecipient; // the person that sent this update request

            //Check locks 
            var NewsLockEntry = _NewsDBcontext.FeedItemQueueLocks
               .Where(t => t.fkItemID == FeedItemQueueObject.id && t.LockedByRecipientID == AppUserId)
               .FirstOrDefault();

            if (NewsLockEntry != null) // lock exists
            {
                var AppUser = _context.AppUser
                        .Where(u => u.AppUserID == AppUserId)
                        .FirstOrDefault();

                if (NewsLockEntry.LockedByRecipientID == AppUserId) // locked to someone else
                {
                    // locked to current user, remove the lock
                    _NewsDBcontext.FeedItemQueueLocks.Remove(NewsLockEntry);
                }
                else
                {
                    if (AppUser == null)
                    {
                        Message = "Record locked by " + AppUserId;
                    }
                    else
                    {
                        Message = "Record locked by " + AppUser.AppUserName;
                    }
                    return BadRequest(Message);
                }
                
                
            }

            // Update News if everything looks ok
            _NewsDBcontext.Entry(FeedItemQueueEntry).CurrentValues.SetValues(FeedItemQueueObject);
            
            try
            {
                _NewsDBcontext.SaveChanges();
            }
            catch (Exception e)
            {
                var logInfo = e.Message;
                { return BadRequest(e.Message); }
            }
          
            #region Update HR Data
            try
            {
                var Modules = _context.ApplicationModules;
                var QueueGuid = (from mods in Modules
                                 where mods.ModuleName == "News Queue"
                                 select mods.QueueGuid).FirstOrDefault();

                var JsonData = JsonConvert.SerializeObject(FeedItemQueueObject);

                WorkItemPutRequest HRPutRequest = new WorkItemPutRequest();
                HRPutRequest.isActive = true;
                HRPutRequest.name = "Updating Entries for News Entry " + FeedItemQueueObject.id;
                HRPutRequest.description = "Updating Entries for News Entry " + FeedItemQueueObject.id;
                HRPutRequest.queueGuid = QueueGuid;
                HRPutRequest.statusDetailTypeGuid = _configuration.GetSection("HumanReview:statusDetailTypeGuid_upd").Value;
                HRPutRequest.reviewTypeGuid = _configuration.GetSection("HumanReview:reviewTypeGuid_upd").Value;
                HRPutRequest.formDefinitionJson = JsonData;
                HRPutRequest.workitemGuid = WorkItemGuid.ToString();

                var returnDataFromHR = Common.putWorkItemForEntityAsync(HRPutRequest, HRtoken, _configuration);
                if (returnDataFromHR.isSuccessful != true)
                {
                    // TODO: log this error
                    { return BadRequest("Unable to save HR data"); }
                }
            }
            catch (Exception e)
            {
                // log error 
                var logInfo = e.Message;
                { return BadRequest(e.Message); }

            }
            #endregion

            return Ok();
        }
    }
}
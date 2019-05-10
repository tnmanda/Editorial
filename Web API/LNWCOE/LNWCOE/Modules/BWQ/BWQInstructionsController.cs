using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LNWCOE.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using LNWCOE.Models.BWQ;
using Microsoft.Extensions.Configuration;
using System;
using System.Net.Http;
using Newtonsoft.Json;
using System.Text;
using LNWCOE.Models.HRData;
using System.Net.Http.Headers;

namespace LNWCOE.Helpers.BWQ
{
    [Produces("application/json")]
    [Route("api/bwq/BWQInstructions")]
    [Authorize]
    public class BWQInstructionsController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<BWQInstructionsController> _logger;
        private IConfiguration _configuration;

        public BWQInstructionsController(AppDbContext context, ILogger<BWQInstructionsController> logger, IConfiguration configuration)
        {
            this._context = context;
            this._logger = logger;
            this._configuration = configuration;
        }

        [HttpGet]
        public IEnumerable<BWQInstructions> Get()
        {
            var ret = _context.BWQInstructions.ToList();

            return ret;
        }

        [HttpGet("{id}", Name = "GetBWQInstructions")]
        public BWQInstructions Get(int id)
        {
            var ret = _context.BWQInstructions
                .Where(x => x.BWQInstructionsID == id)
                .Include("BWQEntities")
                .Include("BWQDispositions")
                .Include("BWQFieldSelect");

            return ret.FirstOrDefault();
        }

        [HttpPost("ent")]
        public JsonResult GetInstructionsByEntity([FromBody] WorkItemPostData postData)
        {
            var Message = "";
            if (postData.ModuleTableEntryID == 0)
            {
                Message = "No BWQ Entity given";
                return Json(Message);
            }
            if (postData.ProfileId == "")
            {
                Message = "No Profile given";
                return Json(Message);
            }
            if (postData.token == "")
            {
                Message = "No token given";
                return Json(Message);
            }

            var BwqEntities = _context.BWQEntities.Where(t => t.BWQEntitiesID == postData.ModuleTableEntryID);

            //var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJocmV2dXNlcjIiLCJzaWQiOiI4OTI4MjkyNzI4MjI4MjgyODcxMDIiLCJqdGkiOiJmYzliODk5Ny0wZTM4LTQwMjUtYTlmYy04OTY2OWY2MDhmMDkiLCJyb2wiOlt7ImlzYWRtIjp0cnVlLCJybmFtZSI6ImhyLWFkbWluIiwiZ3JwIjpbeyJnbmFtZSI6IkhSV0NPSk9CIn1dfV0sImRtbl9hZG0iOlt7ImRuYW1lIjoiYWRmNDgxOGItYzQxYy00ZjZhLTg1NjAtM2U0NjQxNWQyYzkzIn1dLCJpcHMiOlsiMTI3LjAuMC4xLzEyNy4wLjAuMSJdLCJleHAiOjE1MzkwODk3NjAsImlzcyI6Imh0dHA6Ly9odW1hbnJldmlldy5hcGkucmlzay5sZXhpc25leGlzLmNvbSIsImF1ZCI6Imh0dHA6Ly9odW1hbnJldmlldy5yaXNrLmxleGlzbmV4aXMuY29tIn0.D0JIe7CWT53Lmzfz3BsPzdSHWdDnK-cXxDj7TYdS3SI";
            var token = postData.token;


            var Modules = _context.ApplicationModules;
            var QueueGuid = (from mods in Modules
                             where mods.ModuleName == "BWQ"
                             select mods.QueueGuid).FirstOrDefault();
            //Queue Guid "D673666A-C99A-4219-9378-032B15FD0C08"


            ReturnData retValue;
            int WorkItemCount = 0;

            foreach (var ent in BwqEntities)
            {
                if (ent.WorkItemID == null)
                {
                    WorkItemCount += 1;

                    var BWQEntityInstructions = _context.BWQInstructions.Where(t => t.BWQEntitiesID == ent.BWQEntitiesID);
                    var JsonData = JsonConvert.SerializeObject(BWQEntityInstructions);

                    WorkItemRequest req = new WorkItemRequest();
                    req.name = "Work Item ID entry for " + postData.ModuleTableEntryID + " and Profile " + postData.ProfileId;
                    req.description = "Work Item ID entry for BWQ Entity " + postData.ModuleTableEntryID + " and Profile " + postData.ProfileId;
                    req.queueGuid = QueueGuid;
                    req.statusDetailTypeGuid = _configuration.GetSection("HumanReview:statusDetailTypeGuid_upd").Value; ;
                    req.reviewTypeGuid = _configuration.GetSection("HumanReview:reviewTypeGuid_upd").Value; ;
                    req.formDefinitionJson = JsonData;
                    req.isActive = true;

                    var returnGuid = postWorkItemForEntityAsync(req, token);
                    // workitem here
                    if (returnGuid.value.workItemGuid != null)
                    {
                        ent.WorkItemID = new Guid(returnGuid.value.workItemGuid);
                    }
                }
            }

            if (WorkItemCount > 0)
            {
                retValue = _context.SaveData();

                if (retValue.Message != "Success")
                { return Json(retValue); } // return error if workitemid was not updated for this bwq entity
            }

            var ret = from ins in _context.BWQInstructions
                      join ents in _context.BWQEntities on ins.BWQEntitiesID equals ents.BWQEntitiesID
                      join bwqs in _context.BWQ on ents.BWQID equals bwqs.BWQID
                      join bwqf in _context.BWQFieldSelect on ins.BWQFieldSelectID equals bwqf.BWQFieldSelectID
                      where ents.BWQEntitiesID == postData.ModuleTableEntryID
                      select new
                      {
                          BWQInstructionsID = ins.BWQInstructionsID,
                          BWQDispositionsID = ins.BWQDispositionsID,
                          BWQEntitiesID = ins.BWQEntitiesID,
                          BWQFieldSelectID = ins.BWQFieldSelectID,
                          BWQDispositions = ins.BWQDispositions,
                          //BWQEntities = ins.BWQEntities,
                          //BWQFieldSelect = ins.BWQFieldSelect,
                          Instructions = ins.Instructions,
                          CreatedBy = ins.CreatedBy,
                          DateCreatedUTC = ins.DateCreatedUTC,
                          UpdatedBy = ins.UpdatedBy,
                          LastUpdatedUTC = ins.LastUpdatedUTC,
                          BatchName = bwqs.BatchName,
                          WorkItemId = ents.WorkItemID,
                          Item = bwqf.FieldDisplayName
                      };

            if (ret.Count() < 1)
            {
                {
                    Message = "Instructions not found for BWQ Entity " + postData.ModuleTableEntryID;
                    return Json(Message);
                }

            }

            return Json(ret);
        }

        [HttpPost]
        public IActionResult Create([FromBody] BWQInstructions newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.BWQInstructions.Add(newmodel);
                _context.SaveChanges();

                return CreatedAtRoute("GetBWQInstructions", new { id = newmodel.BWQInstructionsID }, newmodel);
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.BWQInstructions.FirstOrDefault(t => t.BWQInstructionsID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.BWQInstructions.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<BWQInstructions> modeltopatch)
        {
            var topatch = _context.BWQInstructions.FirstOrDefault(t => t.BWQInstructionsID == id);
            if (topatch == null)
            { return NotFound(); }

            modeltopatch.ApplyTo(topatch);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPut]
        public IActionResult UpdateEntry([FromBody] BWQInstructionsData objupd)
        {

            // Check if HR is up
            var hruri = _configuration.GetSection("HumanReview:uri").Value + "auth/token";
            var hrResponse = Common.ServerStatusBy(hruri);

            // 400 - Not Found
            // 401 - Unauthorized (unlikely)
            // 404 - Bad Request

            // We expect a 400 - Bad Request, anything else specifically 404 Not Found, return an error
            if (hrResponse.StatusCode == 404)
            {
                { return NotFound("Human Review Service Not Found"); }
            }

            int BWQEntityID = 0;
            int MMMProfileID = 0;
            string workItemGuid = "";
            ReturnData ret;

            // Update the Editorial Data
            #region Save Editorial data
            foreach (var updateobj in objupd.instructions)
            {
                var targetObject = _context.BWQInstructions.FirstOrDefault(t => t.BWQInstructionsID == updateobj.BWQInstructionsID);
                if (targetObject == null)
                { return NotFound("BWQ Instruction not found"); }

                var BWQEntity = _context.BWQEntities.FirstOrDefault(u => u.BWQEntitiesID == targetObject.BWQEntitiesID);
                if (BWQEntity == null)
                { return NotFound("No BWQ Entity found for this BWQ Instruction"); }

                // TODO check the lock table if its still valid
                // WorkUnitTypeID == 6 is BWQ
                var thislock = _context.RecordLocks
                    .Where(v => v.WorkUnitTypeID == 6
                    && v.IDFromWorkUnitsDBTable == BWQEntity.BWQEntitiesID);
                //&& v.AppUserID == Convert.ToInt32(targetObject.UpdatedBy)

                foreach (var locks in thislock)
                {
                    if (locks.AppUserID != Convert.ToInt32(updateobj.UpdatedBy)) // record lock found for another user
                    {
                        var lockedToUser = _context.AppUser.FirstOrDefault(u => u.AppUserID == Convert.ToInt32(updateobj.UpdatedBy));

                        return BadRequest("BWQ Instruction locked to: " + lockedToUser.AppUserName);
                    }

                    if (locks != null) // no locks
                    {
                        _context.RecordLocks.Remove(locks);
                    }
                }
                // Save Instruction
                _context.Entry(targetObject).CurrentValues.SetValues(updateobj);
                BWQEntityID = BWQEntity.BWQEntitiesID;
                MMMProfileID = BWQEntity.MMMEntityID;
                workItemGuid = BWQEntity.WorkItemID.ToString();

                if (workItemGuid == "")
                {
                    return NotFound("No WorkItem Found for instruction " + BWQEntityID);
                }
            }

            ret = _context.SaveData(); // Save Editorial data

            if (ret.Message != "Success")
            { return Json(ret); }

            #endregion

            #region Update HR Data
            try
            {
                var Modules = _context.ApplicationModules;
                var QueueGuid = (from mods in Modules
                                 where mods.ModuleName == "BWQ"
                                 select mods.QueueGuid).FirstOrDefault();

                var JsonData = JsonConvert.SerializeObject(objupd.instructions);

                WorkItemPutRequest HRPutRequest = new WorkItemPutRequest();
                HRPutRequest.isActive = true;
                HRPutRequest.name = "Updating Entries for BWQ Entity " + BWQEntityID + " and Profile ID " + MMMProfileID;
                HRPutRequest.description = "Updating Entries for BWQ Entity " + BWQEntityID + " and Profile " + MMMProfileID;
                HRPutRequest.queueGuid = QueueGuid;
                HRPutRequest.statusDetailTypeGuid = _configuration.GetSection("HumanReview:statusDetailTypeGuid_upd").Value;
                HRPutRequest.reviewTypeGuid = _configuration.GetSection("HumanReview:reviewTypeGuid_upd").Value;
                HRPutRequest.formDefinitionJson = JsonData;
                HRPutRequest.workitemGuid = workItemGuid;

                var returnDataFromHR = putWorkItemForEntityAsync(HRPutRequest, objupd.HRToken);
            }
            catch (Exception e)
            {
                var LogInfo = e.Message;
            }
            #endregion


            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        private WorkItemData postWorkItemForEntityAsync(WorkItemRequest wkitem, string token)
        {
            string hruri = _configuration.GetSection("HumanReview:uri").Value + "workItems/";
            Uri uri = new Uri(hruri);
            HttpResponseMessage response;
            HttpClient client;

            WorkItemData wrkData;

            using (client = new HttpClient())
            {
                client.DefaultRequestHeaders.Accept.Clear();

                client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json");
                client.DefaultRequestHeaders.TryAddWithoutValidation("X-HumanReviewApi-Version", "1.0");
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                var jsonText = JsonConvert.SerializeObject(wkitem);
                var jsonContent = new StringContent(jsonText, UnicodeEncoding.UTF8, "application/json");
                ;
                response = client.PostAsync(uri, jsonContent).Result;
                response.EnsureSuccessStatusCode();
                var dataString = response.Content.ReadAsStringAsync().Result;

                wrkData = JsonConvert.DeserializeObject<WorkItemData>(dataString);

            }
            return (wrkData);
        }

        private WorkItemData putWorkItemForEntityAsync(WorkItemPutRequest wkitem, string token)
        {
            string hruri = _configuration.GetSection("HumanReview:uri").Value + "workItems/";
            Uri uri = new Uri(hruri);
            HttpResponseMessage response;
            HttpClient client;

            WorkItemData wrkData;
            using (client = new HttpClient())
            {
                client.DefaultRequestHeaders.Accept.Clear();

                client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json");
                client.DefaultRequestHeaders.TryAddWithoutValidation("X-HumanReviewApi-Version", "1.0");
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                var jsonText = JsonConvert.SerializeObject(wkitem);
                var jsonContent = new StringContent(jsonText, UnicodeEncoding.UTF8, "application/json");
                ;
                response = client.PutAsync(uri, jsonContent).Result;
                response.EnsureSuccessStatusCode();
                var dataString = response.Content.ReadAsStringAsync().Result;

                wrkData = JsonConvert.DeserializeObject<WorkItemData>(dataString);

            }
            return (wrkData);
        }
    }
}
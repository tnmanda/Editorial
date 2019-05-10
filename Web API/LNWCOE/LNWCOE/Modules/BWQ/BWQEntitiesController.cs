using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LNWCOE.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.Extensions.Logging;
using LNWCOE.Models.BWQ;
using Microsoft.EntityFrameworkCore;
using LNWCOE.Models;
using LNWCOE.Models.HRData;
using Microsoft.Extensions.Configuration;
using System;
using System.Net.Http;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Text;

namespace LNWCOE.Helpers.BWQ
{
    [Produces("application/json")]
    [Route("api/bwq/BWQEntities")]
    [Authorize]
    public class BWQEntitiesController : Controller
    {
        private readonly AppDbContext _context;
        private readonly MMMDBContext _mmmcontext;
        private readonly ILogger<BWQEntitiesController> _logger;
        private IConfiguration _configuration;

        public BWQEntitiesController(AppDbContext context, MMMDBContext mmmcontext, ILogger<BWQEntitiesController> logger, IConfiguration configuration)
        {
            this._context = context;
            this._mmmcontext = mmmcontext;
            this._logger = logger;
            this._configuration = configuration;
        }

        [HttpGet]
        public IEnumerable<BWQEntities> Get()
        {
            var ret = _context.BWQEntities.ToList();

            return ret;
        }

        [HttpGet("{id}", Name = "GetBWQEntities")]
        public BWQEntities Get(int id)
        {
            var ret = _context.BWQEntities
                .Where(x => x.BWQEntitiesID == id)
                .Include("BWQ");

            return ret.FirstOrDefault();
        }

        // Call this from Human Review to get BWQ Instructions and the Entity details
        [HttpGet("guid/{guid}")] 
        public JsonResult GetInstructionsByGuid(Guid guid)
        {
            if (guid == null)
            {
                var Message = "Error in Input";
                    return Json(Message);
            }

            // Get Entity from BWQEntities
            var ThisEntity = _context.BWQEntities.Where(t => t.WorkItemID == guid).FirstOrDefault();
            if (ThisEntity == null)
            {
                var Message = "Entity not found in Editorial Database for WorkItem " + guid;
                return Json(Message);
            }

            // Get Entity Details from MMM DB
            var EntityDetails = _mmmcontext.Entities.Where(t => t.Ent_ID == ThisEntity.MMMEntityID).FirstOrDefault();
            if (EntityDetails == null) // Entry not defined in MMM return Error
            {
                var Message = "Entity not found in Profile Database " + ThisEntity.MMMEntityID;
                return Json(Message);
            }

            // Get Instructions
            var ret = from ins in _context.BWQInstructions
                      join ents in _context.BWQEntities on ins.BWQEntitiesID equals ents.BWQEntitiesID
                      join bwqs in _context.BWQ on ents.BWQID equals bwqs.BWQID
                      join bwqf in _context.BWQFieldSelect on ins.BWQFieldSelectID equals bwqf.BWQFieldSelectID
                      where ents.BWQEntitiesID == ThisEntity.BWQEntitiesID
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
                          Item = bwqf.FieldDisplayName,
                      };
            if(ret.Count() < 1)
            {
                {
                    var Message = "Entity not found";
                    return Json(Message);
                }
            }

            var returnData = new { Entity = EntityDetails, Instructions = ret };

            return Json(returnData);

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
            // Check if HR is up
            var hruri = _configuration.GetSection("HumanReview:uri").Value + "auth/token";
            var hrResponse = Common.ServerStatusBy(hruri);

            // We expect a 400 - Bad Request, anything else specifically 404 Not Found, return an error
            if (hrResponse.StatusCode == 404)
            {
                { return Json("Error: Human Review Service unavailable"); }
            }


            var token = postData.token;

            // check for WorkItemID
            var BwqEntity = _context.BWQEntities.Where(t => t.BWQEntitiesID == postData.ModuleTableEntryID);

            //check if there is an existing WorkItem previously defined
            var DefinedWorkItemGuid = (from bwqents in BwqEntity
                                       where bwqents.WorkItemID != null
                                       select bwqents.WorkItemID).FirstOrDefault().ToString();


            
            // Get the Entity Detail from MMM, return if not found
            var EntityDetails = _mmmcontext.Entities.Where(t => t.Ent_ID == Convert.ToInt32(postData.ProfileId)).FirstOrDefault();
            if (EntityDetails == null)
            {
                var notfound = new
                {
                    Success = false,
                    Message = "Profile not found in Profile Database"
                };
                return Json(notfound);
            }
            
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
                                 where mods.ModuleName == "BWQ"
                                 select mods.QueueGuid).FirstOrDefault();

                var BWQEntityInstructions = _context.BWQInstructions.Where(t => t.BWQEntitiesID == postData.ModuleTableEntryID);
                var JsonData = JsonConvert.SerializeObject(BWQEntityInstructions);

                WorkItemRequest req = new WorkItemRequest();
                req.name = "Work Item ID entry for BWQ Entity " + postData.ModuleTableEntryID + " and Profile " + postData.ProfileId;
                req.description = "Work Item ID entry for BWQ Entity " + postData.ModuleTableEntryID + " and Profile " + postData.ProfileId;
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

            foreach (var ent in BwqEntity)
            {
                if (ent.WorkItemID == null)
                {
                    WorkItemCount += 1;
                   
                    // Set workitemGuid 
                    ent.WorkItemID = GuidToSet;
                }
            }

            if (WorkItemCount > 0)
            {
                retValue = _context.SaveData();

                if (retValue.Message != "Success")
                { return Json(retValue); } // return error if workitemid was not updated for this bwq entity
            }

            return Json(new { WorkItemGuid = GuidToSet });
        }

        [HttpPost("filter")]
        public JsonResult GenBWQEntities([FromBody] BWQEntityFilter filter)
        {
            if (ModelState.IsValid && filter != null)
            {
                IQueryable<BWQEntity> result = _context.BWQEntity
                    .FromSql($"usp_GetBWQEntities_sel @countryName={filter.countryName}, @categoryName={filter.categoryName}, @batchName={filter.batchName}, @aging={filter.aging}, @appuser={filter.appUserID}")
                    .Select(pg => new BWQEntity
                    {
                        BWQEntitiesId = pg.BWQEntitiesId,
                        MMMEntityId = pg.MMMEntityId,
                        EntityName = pg.EntityName,
                        BatchCount = pg.BatchCount,
                        OriginalCount = pg.OriginalCount,
                        BatchName = pg.BatchName,
                        Priority = pg.Priority,
                        CountryName = pg.CountryName,
                        CategoryName = pg.CategoryName,
                        StartDateUTC = pg.StartDateUTC,
                        LockedBy = pg.LockedBy,
                        LockedAt = pg.LockedAt  
                    });

                return Json(result.ToList());
            }
            return Json("");
        }

        [HttpPost]
        public IActionResult Create([FromBody] BWQEntities newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.BWQEntities.Add(newmodel);
                _context.SaveChanges();

                return CreatedAtRoute("GetBWQEntities", new { id = newmodel.BWQEntitiesID }, newmodel);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.BWQEntities.FirstOrDefault(t => t.BWQEntitiesID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.BWQEntities.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<BWQEntities> modeltopatch)
        {
            var topatch = _context.BWQEntities.FirstOrDefault(t => t.BWQEntitiesID == id);
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
        public IActionResult UpdateEntry([FromBody] BWQEntities objupd)
        {
            var targetObject = _context.BWQEntities.FirstOrDefault(t => t.BWQEntitiesID == objupd.BWQEntitiesID);
            if (targetObject == null)
            { return NotFound(); }

            _context.Entry(targetObject).CurrentValues.SetValues(objupd);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        //private System.Threading.Tasks.Task<string> getWorkItemForEntityAsync(WorkItemRequest wkitem, string token)
        /*
        private WorkItemData getWorkItemForEntityAsync(WorkItemRequest wkitem, string token)
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
        */
    }
}
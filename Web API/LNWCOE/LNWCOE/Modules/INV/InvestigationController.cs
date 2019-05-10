using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LNWCOE.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using LNWCOE.Models.INV;
using LNWCOE.Helpers;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System;
using LNWCOE.Models.HRData;
using Newtonsoft.Json;
using Microsoft.Extensions.Configuration;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using Newtonsoft.Json.Serialization;

namespace LNWCOE.Modules.INV
{
    [Produces("application/json")]
    [Route("api/Investigation")]
    [Authorize]
    public class InvestigationController : Controller
    {
        private readonly AppDbContext _context;
        private readonly MMMDBContext _MMMcontext;
        private IConfiguration _configuration;
        readonly ILogger<InvestigationController> _logger;

        public InvestigationController(AppDbContext context, MMMDBContext MMMcontext, ILogger<InvestigationController> logger, IConfiguration configuration)
        {
            this._MMMcontext = MMMcontext;
            this._context = context;
            this._logger = logger;
            this._configuration = configuration;
        }

        [HttpGet]
        public IEnumerable<Investigation> Get()
        {
            var ret = _context.Investigation.ToList();
            return ret;
        }

        [HttpGet("{id}", Name = "GetInvestigationEntry")]
        //public IQueryable<Investigation> Get(int id)
        public JsonResult Get(int id)
        {
            var invData = _context.Investigation
                .Where(x => x.InvestigationID == id)
                .Include("PriorityType")
                .Include("Country")
                .Include("FunctionType")
                .Include("InvestigationDispositions")
                .Include("InvestigationStatus").FirstOrDefault();

            var thisEntityID = _context.InvestigationEntity
                .Where(x => x.InvestigationID == id).FirstOrDefault();


            var thisEntity = _MMMcontext.Entities
                 .Where(x => x.Ent_ID == thisEntityID.Ent_ID);

            var Age = 0;

            DateTime tempDOB;
            if (DateTime.TryParse(invData.DOB, out tempDOB))
            {
                var DateOfBirth = Convert.ToDateTime(tempDOB);
                int age = 0;
                age = DateTime.Now.Year - DateOfBirth.Year;
                if (DateTime.Now.DayOfYear < DateOfBirth.DayOfYear)
                    age = age - 1;
                Age = age;
            }
            else
            {
                Age = -1;
            }


            var reasonData = new
            {
                Reason = invData.Reason,
                Country = (invData.CountryOfRecord != "" ? invData.CountryOfRecord : "No Country supplied."),
                Age = (Age != -1 ? Age.ToString() : "No valid DOB supplied, age not computed."),
                OtherInfo = (invData.OtherInfo != "" ? invData.OtherInfo : "No Other Info supplied."),
                Comments = (invData.Comments != "" ? invData.Comments : "No Comments supplied."),
                Created = (invData.DateCreatedUTC.ToString() != "" ? invData.DateCreatedUTC.ToString() : "No Created Date supplied."),
                DOB = (invData.DOB.ToString() != "" ? invData.DOB.ToString() : "No DOB supplied."),
            };

            //notes
            var notes =
                from inote in _context.InvestigationNote
                join user in _context.AppUser on inote.CreatedBy equals user.AppUserID.ToString()
                where inote.InvestigationID == id
                //orderby inote.DateCreatedUTC descending
                select new
                {
                    DateCreated = inote.DateCreatedUTC,
                    CreatedBy = user.AppUserName,
                    Note = inote.NoteText
                };

            var activities =
                from act in _context.InvestigationActivity
                join acttype in _context.ActivityType on act.ActivityTypeID equals acttype.ActivityTypeID
                join user in _context.AppUser on act.AppUserID equals user.AppUserID
                where act.InvestigationID == id
                //orderby act.DateCreatedUTC descending
                select new
                {
                    DateCreatedUTC = act.DateCreatedUTC,
                    ActivityTypeName = acttype.ActivityTypeName == "View" ? " Record Viewed By " :
                        acttype.ActivityTypeName == "Email" ? " Sent Email " :
                        acttype.ActivityTypeName == "Document" ? " attached on " :
                        " changed from " + act.FromValue + " to " + act.ToValue,
                    AppUserName = user.AppUserName
                };

            //.Where(x => x.InvestigationID == id)
            //.OrderBy(x => x.DateCreatedUTC);


            var returnData = JObject.FromObject(new { Investigation = invData, Reason = reasonData, Entity = thisEntity, Notes = notes, Activity = activities });


            return Json(returnData);
        }

        [HttpGet("guid/{guid}")]
        public JsonResult GetByGuid(Guid guid)
        {
            var invData = _context.Investigation
                .Where(x => x.WorkItemID == guid)
                .Include("PriorityType")
                .Include("Country")
                .Include("FunctionType")
                .Include("InvestigationDispositions")
                .Include("InvestigationStatus").FirstOrDefault();

            var thisEntity = _MMMcontext.Entities
                 .Where(x => x.Name.Trim().ToUpper() == invData.EntityName.Trim().ToUpper()).FirstOrDefault();

            var Age = 0;

            DateTime tempDOB;
            if (DateTime.TryParse(invData.DOB, out tempDOB))
            {
                var DateOfBirth = Convert.ToDateTime(tempDOB);
                int age = 0;
                age = DateTime.Now.Year - DateOfBirth.Year;
                if (DateTime.Now.DayOfYear < DateOfBirth.DayOfYear)
                    age = age - 1;
                Age = age;
            }
            else
            {
                Age = -1;
            }

            var reasonData = new
            {
                Reason = invData.Reason,
                Country = (invData.CountryOfRecord != "" ? invData.CountryOfRecord : "No Country supplied."),
                Age = (Age != -1 ? Age.ToString() : "No valid DOB supplied, age not computed."),
                OtherInfo = (invData.OtherInfo != "" ? invData.OtherInfo : "No Other Info supplied."),
                Comments = (invData.Comments != "" ? invData.Comments : "No Comments supplied."),
                Created = (invData.DateCreatedUTC.ToString() != "" ? invData.DateCreatedUTC.ToString() : "No Created Date supplied."),
                DOB = (invData.DOB.ToString() != "" ? invData.DOB.ToString() : "No DOB supplied."),
            };

            //notes
            var notes =
                from inote in _context.InvestigationNote
                join user in _context.AppUser on inote.CreatedBy equals user.AppUserID.ToString()
                where inote.InvestigationID == invData.InvestigationID
                //orderby inote.DateCreatedUTC descending
                select new
                {
                    DateCreated = inote.DateCreatedUTC,
                    CreatedBy = user.AppUserName,
                    Note = inote.NoteText
                };

            var activities =
                from act in _context.InvestigationActivity
                join acttype in _context.ActivityType on act.ActivityTypeID equals acttype.ActivityTypeID
                join user in _context.AppUser on act.AppUserID equals user.AppUserID
                where act.InvestigationID == invData.InvestigationID
                //orderby act.DateCreatedUTC descending
                select new
                {
                    DateCreatedUTC = act.DateCreatedUTC,
                    ActivityTypeName = acttype.ActivityTypeName == "View" ? " Record Viewed By " :
                        acttype.ActivityTypeName == "Email" ? " Sent Email " :
                        acttype.ActivityTypeName == "Document" ? " attached on " :
                        " changed from " + act.FromValue + " to " + act.ToValue,
                    AppUserName = user.AppUserName
                };

            //.Where(x => x.InvestigationID == id)
            //.OrderBy(x => x.DateCreatedUTC);


            //var returnData = JObject.FromObject(new { Investigation = invData, Reason = reasonData, Entity = thisEntity, Notes = notes, Activity = activities });


            // force Camel Case, Issue with Angular Material Form information load
            var returnData = Json(new { Investigation = invData, Reason = reasonData, Entity = thisEntity, Notes = notes, Activity = activities },
                new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() }
                );

            return Json(returnData.Value);
        }

        [HttpGet("nav/{appuserid}")]
        public JsonResult GetINVWithCountsAndUser(int appuserid)
        {


            IQueryable<InvNavDataWithUser> barnavall = _context.InvNavDataWithUser.AsNoTracking().FromSql(@"usp_INVGetNavigation_sel")
                .Select(navdata => new InvNavDataWithUser
                {
                    InvestigationID = navdata.InvestigationID,
                    InvestigationName = navdata.InvestigationName,
                    Priority = navdata.Priority,
                    Country = navdata.Country,
                    Function = navdata.Function,
                    Disposition = navdata.Disposition,
                    MMMDDUsersID = navdata.MMMDDUsersID,
                    User = navdata.User,
                    DateCreatedUTC = navdata.DateCreatedUTC,
                    Aging = navdata.Aging

                });

            // MY WORK
            IQueryable<InvNavDataWithUser> barnavuser = _context.InvNavDataWithUser.AsNoTracking().FromSql($"usp_INVGetNavigationWithUser_sel {appuserid} ")
               .Select(navdata => new InvNavDataWithUser
               {
                   InvestigationID = navdata.InvestigationID,
                   InvestigationName = navdata.InvestigationName,
                   Priority = navdata.Priority,
                   Country = navdata.Country,
                   Function = navdata.Function,
                   Disposition = navdata.Disposition,
                   MMMDDUsersID = navdata.MMMDDUsersID,
                   User = navdata.User,
                   DateCreatedUTC = navdata.DateCreatedUTC,
                   Aging = navdata.Aging

               });
            /*
            IQueryable<InvNavDataWithUser> barnavuser = (from withuser in barnavall
                                                         where withuser.User == appuserid
                                                         select withuser);

    */

            // By Aging
            #region By Aging
            var ByAgingMy = (from byaging in barnavuser
                             group byaging by byaging.Aging into Grouping
                             //orderby Grouping.Key
                             select new
                             {
                                 label = ((Grouping.Key == 1) ? "11+ days" : "1-10 days") + " (" + Grouping.Count() + ")",
                                 data = (Grouping.Key == 1) ? "11+ days" : "1-10 days",
                                 children = from subg in Grouping
                                            group subg by subg.Country into SubGrouping
                                            //orderby SubGrouping.Key
                                            select new
                                            {
                                                label = SubGrouping.Key + " (" + SubGrouping.Count() + ")",
                                                data = SubGrouping.Key + " (" + SubGrouping.Count() + ")",
                                                children = from subsubg in SubGrouping
                                                           group subsubg by subsubg.Function into SubSubGrouping
                                                           //orderby SubSubGrouping.Key
                                                           select new
                                                           {
                                                               label = SubSubGrouping.Key + " (" + SubSubGrouping.Count() + ")",
                                                               data = new
                                                               {
                                                                   countryName = SubGrouping.Key,
                                                                   categoryName = SubSubGrouping.Key,
                                                                   aging = Grouping.Key
                                                               }
                                                           }
                                            }
                             });

            #endregion
            // By Category
            #region By Category
            var ByFunctionMy = (from byfunction in barnavuser
                                group byfunction by byfunction.Function into Grouping
                                //orderby Grouping.Key
                                select new
                                {
                                    label = Grouping.Key + " (" + Grouping.Count() + ")",
                                    data = Grouping.Key,
                                    children = from subg in Grouping
                                               group subg by subg.Country into SubGrouping
                                               //orderby SubGrouping.Key
                                               select new
                                               {
                                                   label = SubGrouping.Key + " (" + SubGrouping.Count() + ")",
                                                   data = new
                                                   {
                                                       countryName = SubGrouping.Key,
                                                       categoryName = Grouping.Key,
                                                       batchName = "",
                                                       aging = 1
                                                   }
                                               }
                                });

            #endregion
            // By Country
            #region By Country
            var ByCountryMy = (from bycountry in barnavuser
                               group bycountry by bycountry.Country into Grouping
                               //orderby Grouping.Key
                               select new
                               {
                                   label = Grouping.Key + " (" + Grouping.Count() + ")",
                                   children = (from subg in Grouping
                                               group subg by subg.Function into SubGrouping
                                               //orderby SubGrouping.Key
                                               select new
                                               {
                                                   label = SubGrouping.Key + " (" + SubGrouping.Count() + ")",
                                                   data = new
                                                   {
                                                       countryName = Grouping.Key,
                                                       categoryName = SubGrouping.Key,
                                                       batchName = "",
                                                       aging = 1
                                                   }
                                               })
                               });

            #endregion

            var mydata1 = JObject.FromObject(new { label = "Country", data = "Country branch", children = ByCountryMy });
            var mydata2 = JObject.FromObject(new { label = "Category", data = "Category branch", children = ByFunctionMy });
            var mydata3 = JObject.FromObject(new { label = "Aging", data = "Aging branch", children = ByAgingMy });

            var mydata = JObject.FromObject(new { label = "My Work", children = new JArray(mydata3, mydata1, mydata2) });


            // ALL
            // By Aging
            #region By Aging

            var ByAgingAll = (from byaging in barnavall
                              group byaging by byaging.Aging into Grouping
                              //orderby Grouping.Key
                              select new
                              {
                                  label = ((Grouping.Key == 1) ? "11+ days" : "1-10 days") + " (" + Grouping.Count() + ")",
                                  data = (Grouping.Key == 1) ? "11+ days" : "1-10 days",
                                  children = from subg in Grouping
                                             group subg by subg.Country into SubGrouping
                                             //orderby SubGrouping.Key
                                             select new
                                             {
                                                 label = SubGrouping.Key + " (" + SubGrouping.Count() + ")",
                                                 data = SubGrouping.Key + " (" + SubGrouping.Count() + ")",
                                                 children = from subsubg in SubGrouping
                                                            group subsubg by subsubg.Function into SubSubGrouping
                                                            //orderby SubSubGrouping.Key
                                                            select new
                                                            {
                                                                label = SubSubGrouping.Key + " (" + SubSubGrouping.Count() + ")",
                                                                data = new
                                                                {
                                                                    countryName = SubGrouping.Key,
                                                                    categoryName = SubSubGrouping.Key,
                                                                    aging = Grouping.Key
                                                                }
                                                            }
                                             }
                              });

            #endregion
            // By Category
            #region By Category
            var ByFunctionAll = (from byfunction in barnavall
                                 group byfunction by byfunction.Function into Grouping
                                 //orderby Grouping.Key
                                 select new
                                 {
                                     label = Grouping.Key + " (" + Grouping.Count() + ")",
                                     data = Grouping.Key,
                                     children = from subg in Grouping
                                                group subg by subg.Country into SubGrouping
                                                //orderby SubGrouping.Key
                                                select new
                                                {
                                                    label = SubGrouping.Key + " (" + SubGrouping.Count() + ")",
                                                    data = new
                                                    {
                                                        countryName = SubGrouping.Key,
                                                        categoryName = Grouping.Key,
                                                        batchName = "",
                                                        aging = 1
                                                    }
                                                }
                                 });

            #endregion
            // By Country
            #region By Country
            var ByCountryAll = (from bycountry in barnavall
                                group bycountry by bycountry.Country into Grouping
                                //orderby Grouping.Key
                                select new
                                {
                                    label = Grouping.Key + " (" + Grouping.Count() + ")",
                                    children = (from subg in Grouping
                                                group subg by subg.Function into SubGrouping
                                                //orderby SubGrouping.Key
                                                select new
                                                {
                                                    label = SubGrouping.Key + " (" + SubGrouping.Count() + ")",
                                                    data = new
                                                    {
                                                        countryName = Grouping.Key,
                                                        categoryName = SubGrouping.Key,
                                                        batchName = "",
                                                        aging = 1
                                                    }
                                                })
                                });

            #endregion


            var alldata1 = JObject.FromObject(new { label = "Country", data = "Country branch", children = ByCountryAll });
            var alldata2 = JObject.FromObject(new { label = "Category", data = "Category branch", children = ByFunctionAll });
            var alldata3 = JObject.FromObject(new { label = "Aging", data = "Aging branch", children = ByAgingAll });

            var alldata = JObject.FromObject(new { label = "All", children = new JArray(alldata3, alldata1, alldata2) });

            var t = new JArray(mydata, alldata);

            return Json(t);

        }

        [HttpPost("filter")]
        public JsonResult GenInvestigations([FromBody] InvestigationFilter filter)
        {
            if (ModelState.IsValid && filter != null)
            {
                var result = _context.InvestigationData
                    .FromSql($"usp_GetInvEntries_sel @countryName={filter.countryName}, @categoryName={filter.categoryName}, @aging={filter.aging}, @appuser={filter.appUserID}")
                    .Select(pg => new InvestigationData
                    {
                        InvestigationID = pg.InvestigationID,
                        Due = pg.Due,
                        Priority = pg.Priority,
                        InvestigationStatusName = pg.InvestigationStatusName,
                        FullName = pg.FullName,
                        DateCreatedUTC = pg.DateCreatedUTC,
                        LastActivityBy = pg.LastActivityBy,
                        LastActivityDate = pg.LastActivityDate,
                        LockedBy = pg.LockedBy,
                        LockedAt = pg.LockedAt,
                        CountryName = pg.CountryName,
                        Category = pg.Category
                    }
                    );

                return Json(result.ToList());
            }
            return Json("");
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
                Message = "No Investigation Entry given";
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

            var token = postData.token;


            // check for WorkItemID
            var InvestigationEntry = _context.Investigation.Where(t => t.InvestigationID == postData.ModuleTableEntryID);

            //check if there is an existing WorkItem previously defined
            var DefinedWorkItemGuid = (from inventry in InvestigationEntry
                                       where inventry.WorkItemID != null
                                       select inventry.WorkItemID).FirstOrDefault().ToString();

            #region profile checking commented
            /*
             * Commented for now,  Investigations only make use of Entity / Profile Names
             * 
            // Get the Entity Detail from MMM, return if not found
            var EntityDetails = _MMMcontext.Entities.Where(t => t.Ent_ID == postData.ProfileId).FirstOrDefault();
            if (EntityDetails == null)
            {
                var notfound = new
                {
                    Success = false,
                    Message = "Profile not found in Profile Database"
                };
                return Json(notfound);
            }
            */
            #endregion

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
                                 where mods.ModuleName == "Investigations"
                                 select mods.QueueGuid).FirstOrDefault();

                var JsonData = JsonConvert.SerializeObject(InvestigationEntry);

                WorkItemRequest req = new WorkItemRequest();
                req.name = "Work Item ID entry for Investigation Entry " + postData.ModuleTableEntryID;
                req.description = "Work Item ID entry for Investigation Entry " + postData.ModuleTableEntryID;
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

            foreach (var investigation in InvestigationEntry)
            {
                if (investigation.WorkItemID == null)
                {
                    WorkItemCount += 1;

                    investigation.WorkItemID = GuidToSet;
                }
            }

            if (WorkItemCount > 0)
            {
                retValue = _context.SaveData();

                if (retValue.Message != "Success")
                { return Json(retValue); } // return error if workitemid was not updated for this investigation
            }


            return Json(new { WorkItemGuid = GuidToSet });

        }

        [HttpPut]
        public IActionResult UpdateEntry([FromBody] InvestigationDataSave objupdobj)
        {
            var objupd = objupdobj.Investigation;

            // Check if HR is up
            var hruri = _configuration.GetSection("HumanReview:uri").Value + "auth/token";
            var hrResponse = Common.ServerStatusBy(hruri);

            // We expect a 400 - Bad Request. Anything else specifically 404 Not Found, return an error
            if (hrResponse.StatusCode == 404)
            {
                { return NotFound("Error: Human Review Service unavailable"); }
            }

            var targetObject = _context.Investigation.FirstOrDefault(t => t.InvestigationID == objupd.InvestigationID);
            if (targetObject == null)
            { return NotFound(); }


            // TODO check the lock table if its still valid
            // WorkUnitTypeID == 6 is BWQ, 3 is Investigations, 4 Alerts

            var thislock = _context.RecordLocks
                .Where(v => v.WorkUnitTypeID == 3
                && v.IDFromWorkUnitsDBTable == objupd.InvestigationID);

            foreach (var locks in thislock)
            {
                if (locks.AppUserID != Convert.ToInt32(objupd.UpdatedBy)) // record lock found for another user
                {
                    var lockedToUser = _context.AppUser.FirstOrDefault(u => u.AppUserID == Convert.ToInt32(locks.AppUserID));

                    return BadRequest("Investigation locked to: " + lockedToUser.AppUserName);
                }

                if (locks != null) // no locks
                {
                    _context.RecordLocks.Remove(locks);
                }
            }

            var InvestigationID = targetObject.InvestigationID;
            var MMMProfileID = targetObject.EntityName;
            var workItemGuid = targetObject.WorkItemID.ToString();

            _context.Entry(targetObject).CurrentValues.SetValues(objupd);

            // Save Notes
            if (objupdobj.InvestigationNote != null)
            {
                _context.InvestigationNote.Add(objupdobj.InvestigationNote);
            }

            ReturnData ret;
            ret = _context.SaveData();

            if (ret.Message != "Success")
            { return Json(ret); }

            #region Human Review
            try
            {
                var Modules = _context.ApplicationModules;
                var QueueGuid = (from mods in Modules
                                 where mods.ModuleName == "Investigations"
                                 select mods.QueueGuid).FirstOrDefault();

                var JsonData = JsonConvert.SerializeObject(objupd); // Serialize the update to Json

                WorkItemPutRequest HRPutRequest = new WorkItemPutRequest();
                HRPutRequest.isActive = true;
                HRPutRequest.name = "Updating Entries for Investigation Entry " + InvestigationID + " and Profile " + MMMProfileID;
                HRPutRequest.description = "Updating Entries for Investigation Entry " + InvestigationID + " and Profile " + MMMProfileID;
                HRPutRequest.queueGuid = QueueGuid;
                HRPutRequest.statusDetailTypeGuid = _configuration.GetSection("HumanReview:statusDetailTypeGuid_upd").Value;
                HRPutRequest.reviewTypeGuid = _configuration.GetSection("HumanReview:reviewTypeGuid_upd").Value;
                HRPutRequest.formDefinitionJson = JsonData;
                HRPutRequest.workitemGuid = workItemGuid;

                var returnDataFromHR = Common.putWorkItemForEntityAsync(HRPutRequest, objupdobj.HRToken, _configuration);
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

        [HttpPost("activity")]
        public IActionResult AddActivity([FromBody] InvestigationDataSave objupdobj)
        {
            var objupd = objupdobj.Investigation;

            var targetObject = _context.Investigation.FirstOrDefault(t => t.InvestigationID == objupd.InvestigationID);
            if (targetObject == null)
            { return NotFound(); }

            List<InvestigationActivity> Activities = new List<InvestigationActivity>();

            bool hasChanges = false;

            if (objupd.PriorityTypeID != targetObject.PriorityTypeID) // Priority change
            {
                var newActivity = new InvestigationActivity();
                newActivity.AppUserID = Convert.ToInt32(objupd.UpdatedBy);
                newActivity.CreatedBy = objupd.UpdatedBy;
                newActivity.DateCreatedUTC = DateTime.UtcNow;
                newActivity.UpdatedBy = objupd.UpdatedBy;
                newActivity.LastUpdatedUTC = DateTime.UtcNow;

                newActivity.InvestigationID = targetObject.InvestigationID;
                newActivity.FromValue = objupd.PriorityTypeID.ToString();
                newActivity.ToValue = targetObject.PriorityTypeID.ToString();
                newActivity.ActivityTypeID = 5; // Priority Type
                //Activities.Add(newActivity);
                _context.InvestigationActivity.Add(newActivity);
                hasChanges = true;
            }
            if (objupd.CountryID != targetObject.CountryID) // Country change
            {
                var newActivity = new InvestigationActivity();
                newActivity.AppUserID = Convert.ToInt32(objupd.UpdatedBy);
                newActivity.CreatedBy = objupd.UpdatedBy;
                newActivity.DateCreatedUTC = DateTime.UtcNow;
                newActivity.UpdatedBy = objupd.UpdatedBy;
                newActivity.LastUpdatedUTC = DateTime.UtcNow;

                newActivity.InvestigationID = targetObject.InvestigationID;
                newActivity.FromValue = objupd.PriorityTypeID.ToString();
                newActivity.ToValue = targetObject.PriorityTypeID.ToString();
                newActivity.ActivityTypeID = 3; // Country Type
                //Activities.Add(newActivity);
                _context.InvestigationActivity.Add(newActivity);
                hasChanges = true;
            }
            if (objupd.InvestigationStatusID != targetObject.InvestigationStatusID) // Status change
            {
                var newActivity = new InvestigationActivity();
                newActivity.AppUserID = Convert.ToInt32(objupd.UpdatedBy);
                newActivity.CreatedBy = objupd.UpdatedBy;
                newActivity.DateCreatedUTC = DateTime.UtcNow;
                newActivity.UpdatedBy = objupd.UpdatedBy;
                newActivity.LastUpdatedUTC = DateTime.UtcNow;

                newActivity.InvestigationID = targetObject.InvestigationID;
                newActivity.FromValue = objupd.PriorityTypeID.ToString();
                newActivity.ToValue = targetObject.PriorityTypeID.ToString();
                newActivity.ActivityTypeID = 2; // Status Type
                //Activities.Add(newActivity);
                _context.InvestigationActivity.Add(newActivity);
                hasChanges = true;
            }
            if (objupd.FunctionTypeID != targetObject.FunctionTypeID) // Category change
            {
                var newActivity = new InvestigationActivity();
                newActivity.AppUserID = Convert.ToInt32(objupd.UpdatedBy);
                newActivity.CreatedBy = objupd.UpdatedBy;
                newActivity.DateCreatedUTC = DateTime.UtcNow;
                newActivity.UpdatedBy = objupd.UpdatedBy;
                newActivity.LastUpdatedUTC = DateTime.UtcNow;

                newActivity.InvestigationID = targetObject.InvestigationID;
                newActivity.FromValue = objupd.PriorityTypeID.ToString();
                newActivity.ToValue = targetObject.PriorityTypeID.ToString();
                newActivity.ActivityTypeID = 7; // Category Type
                //Activities.Add(newActivity);
                _context.InvestigationActivity.Add(newActivity);
                hasChanges = true;
            }
            if (objupd.InvestigationDispositionsID != targetObject.InvestigationDispositionsID) // Disposition change
            {
                var newActivity = new InvestigationActivity();
                newActivity.AppUserID = Convert.ToInt32(objupd.UpdatedBy);
                newActivity.CreatedBy = objupd.UpdatedBy;
                newActivity.DateCreatedUTC = DateTime.UtcNow;
                newActivity.UpdatedBy = objupd.UpdatedBy;
                newActivity.LastUpdatedUTC = DateTime.UtcNow;

                newActivity.InvestigationID = targetObject.InvestigationID;
                newActivity.FromValue = objupd.PriorityTypeID.ToString();
                newActivity.ToValue = targetObject.PriorityTypeID.ToString();
                newActivity.ActivityTypeID = 6; // Disposition Type
                //Activities.Add(newActivity);
                _context.InvestigationActivity.Add(newActivity);
                hasChanges = true;
            }
            if (hasChanges)
            {
                ReturnData ret;
                ret = _context.SaveData();

                if (ret.Message == "Success")
                { return Ok(); }

                return NotFound(ret);
            }

            return NotFound();
        }
        /*
        private WorkItemData getWorkItemAsync(WorkItemRequest wkitem, string token)
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
        */
        [HttpPost("sendmail")]
        public IActionResult SendInvestigationEmail([FromBody] InvestiationEmailRequest emailreq)
        {
            if (Common.IsValidEmail(emailreq.RecipientEmail) != true)
            {
                return BadRequest("Invalid Email");
            }

            if (emailreq.Subject.Trim() == "" || emailreq.Message.Trim() == "" ||
                emailreq.AppUserID == 0 || emailreq.IndexFromWorkTable == 0)
            {
                return BadRequest("Invalid Request, Subject, Body or User cannot be empty ");
            }

            // From User
            var thisUser = _context.AppUser
                .Where(x => x.AppUserID == emailreq.AppUserID).FirstOrDefault();

            if (thisUser == null)
            {
                return BadRequest("User does not Exist ");
            }
            var SentFrom = thisUser.Email;

            // Investigation Entry
            var thisInvestigation = _context.Investigation
                .Where(x => x.InvestigationID == emailreq.IndexFromWorkTable).FirstOrDefault();
            if (thisInvestigation == null)
            {
                return BadRequest("Investigation Record does not Exist ");
            }

            var SMTPServer = _configuration.GetSection("EmailSettings:SMTPServer").Value;
            var SMTPPort = _configuration.GetSection("EmailSettings:SMTPPort").Value;
            var InvestigationToEmail = _configuration.GetSection("EmailSettings:InvestigationToEmail").Value;
            var InvestigationCCEmail = _configuration.GetSection("EmailSettings:InvestigationCCEmail").Value;
            var InvestigationBCCEmail = _configuration.GetSection("EmailSettings:InvestigationBCCEmail").Value;
            var DevEmailAddress = _configuration.GetSection("EmailSettings:DevEmailAddress").Value;
            var StatusOrErrorMessage = _configuration.GetSection("EmailSettings:StatusOrErrorMessage").Value;
            var ResearchersEmailAddress = _configuration.GetSection("EmailSettings:ResearchersEmailAddress").Value;
            var InvestigationEmailSendFromEmailAddress = _configuration.GetSection("EmailSettings:InvestigationEmailSendFromEmailAddress").Value;

            var IsDevelopment = _configuration.GetSection("EmailSettings:Development").Value;

            // TO (recipients)
            var SentTo = emailreq.RecipientEmail;

            if (InvestigationToEmail != "")
            {
                SentTo += ";" + InvestigationToEmail;
            }
            if (InvestigationCCEmail != "")
            {
                SentTo += ";" + InvestigationCCEmail;
            }
            if (InvestigationBCCEmail != "")
            {
                SentTo += ";" + InvestigationBCCEmail;
            }

            var InvestigationEmailEntry = new InvestigationEmails();

            var SentDateUTC = DateTime.UtcNow;
            var DateCreatedUTC = DateTime.UtcNow;
            var LastUpdatedUTC = DateTime.UtcNow;

            var CreatedBy = emailreq.AppUserID.ToString();
            var UpdatedBy = emailreq.AppUserID.ToString();

            var Subject = emailreq.Subject;
            var EmailBody = emailreq.Message;

            // Log Entry in email table
            InvestigationEmailEntry.InvestigationID = emailreq.IndexFromWorkTable;
            InvestigationEmailEntry.AppUserID = emailreq.AppUserID;
            InvestigationEmailEntry.SentTo = SentTo;
            InvestigationEmailEntry.SentFrom = SentFrom;
            InvestigationEmailEntry.Subject = Subject;
            InvestigationEmailEntry.EmailBody = EmailBody;
            InvestigationEmailEntry.StatusOrErrorMessage = StatusOrErrorMessage;
            InvestigationEmailEntry.SentDateUTC = SentDateUTC;
            InvestigationEmailEntry.CreatedBy = CreatedBy;
            InvestigationEmailEntry.DateCreatedUTC = DateCreatedUTC;
            InvestigationEmailEntry.UpdatedBy = UpdatedBy;
            InvestigationEmailEntry.LastUpdatedUTC = LastUpdatedUTC;

            _context.InvestigationEmails.Add(InvestigationEmailEntry);
            // Log Activity
            var thisActivity = new InvestigationActivity();
            thisActivity.InvestigationID = thisInvestigation.InvestigationID;
            thisActivity.ActivityTypeID = 8; //Email Sent Activity Type
            thisActivity.AppUserID = thisUser.AppUserID;
            thisActivity.FromValue = "";
            thisActivity.ToValue = "Sent Email";
            thisActivity.CreatedBy = CreatedBy;
            thisActivity.DateCreatedUTC = DateCreatedUTC;
            thisActivity.UpdatedBy = UpdatedBy;
            thisActivity.LastUpdatedUTC = LastUpdatedUTC;

            _context.InvestigationActivity.Add(thisActivity);

            ReturnData retValue;
            retValue = _context.SaveData();

            if (retValue.Message != "Success")
            { return Json(retValue); }

            // remove after
            SentFrom = "anthony.manda@spi-global.com";
            SentTo = "anthony.manda@spi-global.com";

            var emailSent = Common.SendMail(SMTPServer, SentFrom, SentTo, "", "", Subject, EmailBody, _logger);

            if (emailSent != "Success")
            {
                return BadRequest(emailSent);
            }

            return Ok();
        }


    }
}
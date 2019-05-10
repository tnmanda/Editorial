using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LNWCOE.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using LNWCOE.Models.BWQ;
using Microsoft.EntityFrameworkCore;
using System;
using Newtonsoft.Json.Linq;
using System.Data;
using System.Data.SqlClient;
using LNWCOE.Models.HRData;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

namespace LNWCOE.Helpers.BWQ
{
    [Produces("application/json")]
    [Route("api/BWQ")]
    [Authorize]
    public class BWQController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<BWQController> _logger;
        private IConfiguration _configuration;

        public BWQController(AppDbContext context, ILogger<BWQController> logger, IConfiguration configuration)
        {
            this._context = context;
            this._logger = logger;
            this._configuration = configuration;
        }

        [HttpGet("nav/{appuserid}")]
        public JsonResult GetNavWithCountsAndUser(int appuserid)
        {
            //IQueryable<BwqNavData> barnav = _context.BwqNavData.FromSql(@"usp_BWQGetNavigation_sel")
            IQueryable<BwqNavDataWithUser> barnavall = _context.BwqNavDataWithUser.AsNoTracking().FromSql(@"usp_BWQGetNavigation_sel")
                .Select(navdata => new BwqNavDataWithUser
                {
                    CountryID = navdata.CountryID,
                    CountryName = navdata.CountryName,
                    FunctionTypeID = navdata.FunctionTypeID,
                    FunctionTypeName = navdata.FunctionTypeName,
                    MMMEntityID = navdata.MMMEntityID,
                    BWQID = navdata.BWQID,
                    BatchName = navdata.BatchName,
                    StatusCollectionItemID = navdata.StatusCollectionItemID,
                    StartDateUTC = navdata.StartDateUTC,
                    AppUserId = navdata.AppUserId,
                    Aging = navdata.Aging
                });

            //  My Work
            #region My Work
            IQueryable<BwqNavDataWithUser> barnavuser = _context.BwqNavDataWithUser.AsNoTracking().FromSql($"usp_BWQGetNavigationWithUser_sel {appuserid} ")
                .Select(navdata => new BwqNavDataWithUser
                {
                    CountryID = navdata.CountryID,
                    CountryName = navdata.CountryName,
                    FunctionTypeID = navdata.FunctionTypeID,
                    FunctionTypeName = navdata.FunctionTypeName,
                    MMMEntityID = navdata.MMMEntityID,
                    BWQID = navdata.BWQID,
                    BatchName = navdata.BatchName,
                    StatusCollectionItemID = navdata.StatusCollectionItemID,
                    StartDateUTC = navdata.StartDateUTC,
                    AppUserId = navdata.AppUserId,
                    Aging = navdata.Aging
                });

            /*
            IQueryable<BwqNavDataWithUser> barnavuser = (from withuser in barnavall
                                                         where withuser.AppUserId == appuserid
                                                         select withuser);
              */

            // By Category
            #region By Category
            var funcNavData = (from byfunction in barnavuser
                               group byfunction by byfunction.FunctionTypeName into Grouping
                               //orderby Grouping.Key
                               select new
                               {
                                   label = Grouping.Key + " (" + Grouping.Count() + ")",
                                   data = Grouping.Key,
                                   children = from subg in Grouping
                                              group subg by subg.CountryName into SubGrouping
                                              //orderby SubGrouping.Key
                                              select new
                                              {
                                                  label = SubGrouping.Key + " (" + SubGrouping.Count() + ")",
                                                  data = new
                                                  {
                                                      countryName = SubGrouping.Key,
                                                      categoryName = Grouping.Key,
                                                      batchName = "",
                                                      aging = 1,
                                                      appUserID = appuserid
                                                  }
                                              }
                               });
            #endregion
            //By Country
            #region By Country
            var counNavData = (from bycountry in barnavuser
                               group bycountry by bycountry.CountryName into Grouping
                               //orderby Grouping.Key
                               select new
                               {
                                   label = Grouping.Key + " (" + Grouping.Count() + ")",
                                   children = (from subg in Grouping
                                               group subg by subg.FunctionTypeName into SubGrouping
                                               //orderby SubGrouping.Key
                                               select new
                                               {
                                                   label = SubGrouping.Key + " (" + SubGrouping.Count() + ")",
                                                   data = new
                                                   {
                                                       countryName = Grouping.Key,
                                                       categoryName = SubGrouping.Key,
                                                       batchName = "",
                                                       aging = 1,
                                                       appUserID = appuserid
                                                   }
                                               })
                               });
            #endregion
            // By Batch
            #region By Batch
            var bactNavData = (from byfunction in barnavuser
                               group byfunction by byfunction.BatchName into Grouping
                               //orderby Grouping.Key
                               select new
                               {
                                   label = Grouping.Key + " (" + Grouping.Count() + ")",
                                   data = new
                                   {
                                       countryName = "",
                                       categoryName = "",
                                       batchName = Grouping.Key,
                                       aging = 1,
                                       appUserID = appuserid
                                   }
                               });
            #endregion
            //By Aging
            #region By Aging

            var agingData = (from byaging in barnavuser
                            group byaging by byaging.Aging into Grouping
                            //orderby Grouping.Key
                            select new
                            {
                                label = ((Grouping.Key == 1) ? "11+ days" : "1-10 days") + " (" + Grouping.Count() + ")",
                                data = (Grouping.Key == 1) ? "11+ days" : "1-10 days",
                                children = from subg in Grouping
                                           group subg by subg.CountryName into SubGrouping
                                           //orderby SubGrouping.Key
                                           select new
                                           {
                                               label = SubGrouping.Key + " (" + SubGrouping.Count() + ")",
                                               data = SubGrouping.Key + " (" + SubGrouping.Count() + ")",
                                               children = from subsubg in SubGrouping
                                                          group subsubg by subsubg.FunctionTypeName into SubSubGrouping
                                                          //orderby SubSubGrouping.Key
                                                          select new
                                                          {
                                                              label = SubSubGrouping.Key + " (" + SubSubGrouping.Count() + ")",
                                                              data = new
                                                              {
                                                                  countryName = SubGrouping.Key,
                                                                  categoryName = SubSubGrouping.Key,
                                                                  batchName = "",
                                                                  aging = Grouping.Key,
                                                                  appUserID = appuserid
                                                              }
                                                          }
                                           }
                            });


            #endregion

            var userdata1 = JObject.FromObject(new { label = "Batch", data = "Batch branch", children = bactNavData });
            var userdata2 = JObject.FromObject(new { label = "Country", data = "Country branch", children = counNavData });
            var userdata3 = JObject.FromObject(new { label = "Category", data = "Category branch", children = funcNavData });
            var userdata4 = JObject.FromObject(new { label = "Aging", data = "Aging branch", children = agingData });

            var alluserdata = JObject.FromObject(new { label = "My Work", children = new JArray(userdata4, userdata1, userdata2, userdata3 ) });

            #endregion

            // All
            #region all BWQ
            // By Category
            #region By Category
            var funcNavDataAll = (from byfunction in barnavall
                               group byfunction by byfunction.FunctionTypeName into Grouping
                               //orderby Grouping.Key
                               select new
                               {
                                   label = Grouping.Key + " (" + Grouping.Count() + ")",
                                   data = Grouping.Key,
                                   children = from subg in Grouping
                                              group subg by subg.CountryName into SubGrouping
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
            //By Country
            #region By Country
            var counNavDataAll = (from bycountry in barnavall
                               group bycountry by bycountry.CountryName into Grouping
                               //orderby Grouping.Key
                               select new
                               {
                                   label = Grouping.Key + " (" + Grouping.Count() + ")",
                                   children = (from subg in Grouping
                                               group subg by subg.FunctionTypeName into SubGrouping
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
            // By Batch
            #region By Batch
            var bactNavDataAll = (from byfunction in barnavall
                               group byfunction by byfunction.BatchName into Grouping
                               //orderby Grouping.Key
                               select new
                               {
                                   label = Grouping.Key + " (" + Grouping.Count() + ")",
                                   data = new
                                   {
                                       countryName = "",
                                       categoryName = "",
                                       batchName = Grouping.Key,
                                       aging = 1
                                   }
                               });
            
            #endregion
            //By Aging
            #region By Aging

            var agingAll = (from byaging in barnavall
                              group byaging by byaging.Aging into Grouping
                              //orderby Grouping.Key
                              select new
                              {
                                  label = ((Grouping.Key == 1) ? "11+ days" : "1-10 days") + " (" + Grouping.Count() + ")",
                                  data = (Grouping.Key == 1) ? "11+ days" : "1-10 days",
                                  children = from subg in Grouping
                                             group subg by subg.CountryName into SubGrouping
                                             //orderby SubGrouping.Key
                                             select new
                                             {
                                                 label = SubGrouping.Key + " (" + SubGrouping.Count() + ")",
                                                 data = SubGrouping.Key + " (" + SubGrouping.Count() + ")",
                                                 children = from subsubg in SubGrouping
                                                            group subsubg by subsubg.FunctionTypeName into SubSubGrouping
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

            var alldata1 = JObject.FromObject(new { label = "Batch", data = "Batch branch", children = bactNavDataAll });
            var alldata2 = JObject.FromObject(new { label = "Country", data = "Country branch", children = counNavDataAll });
            var alldata3 = JObject.FromObject(new { label = "Category", data = "Category branch", children = funcNavDataAll });
            var alldata4 = JObject.FromObject(new { label = "Aging", data = "Aging branch", children = agingAll });

            var alldata = JObject.FromObject(new { label = "All", children = new JArray(alldata4, alldata1, alldata2, alldata3 ) });

            #endregion
            var t = new JArray(alluserdata, alldata);

            return Json(t);
        }

        [HttpGet]
        //public IEnumerable<Models.BWQ.BWQ> Get()
        public JsonResult Get()
        {
            //var ret = _context.BWQ.ToList();
            /*
            BWQDispositions defDispRecord = (from defdisp in _context.BWQDispositions
                                 where defdisp.IsDefault == true
                                 select defdisp).FirstOrDefault();

            int defDisp = defDispRecord == null ? -1 : defDispRecord.BWQDispositionsID;
            */

            var batches = _context.BWQ.Select(bwqs => new
            {
                BatchName = bwqs.BatchName,

                Priority = (from priocoll in _context.CollectionItem
                            where priocoll.CollectionItemID == bwqs.PriorityCollectionItemID
                            select priocoll.ItemText).FirstOrDefault().ToString(),
                BwqDescription = bwqs.BwqDescription,
                DateCreatedUTC = bwqs.DateCreatedUTC,
                StartDateUTC = bwqs.StartDateUTC,
                DueDateUTC = bwqs.DueDateUTC,
                Total = bwqs.OriginalCount,

                Remaining = 0,

                BWQID = bwqs.BWQID,
                Status = (from statcoll in _context.CollectionItem
                          where statcoll.CollectionItemID == bwqs.StatusCollectionItemID
                          select statcoll.ItemText).FirstOrDefault().ToString(),

                UpdatedBy = bwqs.UpdatedBy,
                LastUpdatedUTC = bwqs.LastUpdatedUTC,
                CreatedBy = bwqs.CreatedBy,

                PercentComplete = 0
            });
                          
            
            return Json(batches);
        }

        [HttpGet("{id}", Name = "GetBWQ")]
        public JsonResult Get(int id)
        {
            var ret = _context.BWQ
                .Where(x => x.BWQID == id)
                .Select(bwq => new
                {
                    BWQID = bwq.BWQID,
                    Status = (from statcoll in _context.CollectionItem
                              where statcoll.CollectionItemID == bwq.StatusCollectionItemID
                              select statcoll).FirstOrDefault(),
                    Priority = (from priocoll in _context.CollectionItem
                                           where priocoll.CollectionItemID == bwq.PriorityCollectionItemID
                                           select priocoll).FirstOrDefault(),
                    BatchName = bwq.BatchName,
                    BwqDescription = bwq.BwqDescription,
                    StartDateUTC = bwq.StartDateUTC,
                    DueDateUTC = bwq.DueDateUTC,
                    OriginalCount = bwq.OriginalCount,
                    CreatedBy = bwq.CreatedBy,
                    DateCreatedUTC = bwq.DateCreatedUTC,
                    UpdatedBy = bwq.UpdatedBy,
                    LastUpdatedUTC = bwq.LastUpdatedUTC,
                   
                });
                
            return Json(ret);
        }

        [HttpPost]
        public IActionResult Create([FromBody] NewBatchObject newbatch)
        {
            if (!ModelState.IsValid)
            {
                { return NotFound(); }
            }
            if (newbatch.HRToken.Trim() == "")
            {
                { return NotFound("Invalid Token"); }
            }
            if (newbatch.Instructions.Count() < 1)
            {
                return BadRequest("No Instructions found");
            }
            if (newbatch.Ent_IDs.Count < 1)
            {
                return BadRequest("No Entities found");
            }

            // Check if HR is up
            var hruri = _configuration.GetSection("HumanReview:uri").Value + "auth/token";
            var hrResponse = Common.ServerStatusBy(hruri);
            
            // We expect a 400 - Bad Request, anything else specifically 404 Not Found, return an error
            if(hrResponse.StatusCode == 404)
            {
                { return NotFound("Error: Human Review Service unavailable"); }
            }

            int BatchIdOutput = 0;
            string ReturnMessage = "";
            ReturnData retValue;

            var InstructionList = new InstructionsCollection();
            foreach (var ins in newbatch.Instructions)
            {
                InstructionList.Add(ins);
            }
            var EntitiesList = new EntitiesCollection();
            foreach (var ent in newbatch.Ent_IDs)
            {
                EntitiesList.Add(ent);
            }
            

            #region  Save Editorial Data
            try
            {
                using (var sqlCmd = _context.Database.GetDbConnection().CreateCommand())
                {
                    string sp = "usp_CreateBatch_ins";

                    sqlCmd.CommandText = sp;
                    sqlCmd.CommandType = CommandType.StoredProcedure;

                    sqlCmd.Parameters.Add(new SqlParameter("@BatchName", SqlDbType.VarChar, 500) { Value = newbatch.BatchName });
                    sqlCmd.Parameters.Add(new SqlParameter("@Description", SqlDbType.VarChar, 1000) { Value = newbatch.Description });
                    sqlCmd.Parameters.Add(new SqlParameter("@StartDate", SqlDbType.Date) { Value = newbatch.StartDate });
                    sqlCmd.Parameters.Add(new SqlParameter("@DueDate", SqlDbType.Date) { Value = newbatch.DueDate });
                    sqlCmd.Parameters.Add(new SqlParameter("@PriorityCollectionItemID", SqlDbType.Int) { Value = newbatch.PriorityCollectionItemID });
                    sqlCmd.Parameters.Add(new SqlParameter("@StatusCollectionItemID", SqlDbType.Int) { Value = newbatch.StatusCollectionItemID });

                    sqlCmd.Parameters.Add(new SqlParameter("@Instructions", SqlDbType.Structured) { Value = InstructionList });
                    sqlCmd.Parameters.Add(new SqlParameter("@Ent_IDs", SqlDbType.Structured) { Value = EntitiesList });

                    sqlCmd.Parameters.Add(new SqlParameter("@Username", SqlDbType.VarChar, 50) { Value = newbatch.Username });
                    sqlCmd.Parameters.Add(new SqlParameter("@OriginalCount", SqlDbType.Int) { Value = newbatch.OriginalCount });
                    sqlCmd.Parameters.Add(new SqlParameter("@Operation", SqlDbType.VarChar, 500) { Value = newbatch.Operation });

                    // output params
                    SqlParameter Results = new SqlParameter("@Results", SqlDbType.VarChar, 500);
                    SqlParameter NewBWQID = new SqlParameter("@NewBWQID", SqlDbType.Int);
                    Results.Direction = ParameterDirection.Output;
                    NewBWQID.Direction = ParameterDirection.Output;

                    sqlCmd.Parameters.Add(Results);
                    sqlCmd.Parameters.Add(NewBWQID);

                    if (sqlCmd.Connection.State != ConnectionState.Open)
                        sqlCmd.Connection.Open();

                    var execResult = sqlCmd.ExecuteNonQuery();
                    ReturnMessage = Results.Value.ToString();

                    if (NewBWQID.Value.ToString() == "") // no records created
                    {
                        return BadRequest(new { batch = BatchIdOutput, message = ReturnMessage });
                    }

                    BatchIdOutput = Convert.ToInt32(NewBWQID.Value);
                    
                }
            }
            catch (Exception e)
            {
                // TODO: log
                return BadRequest(new { batch = BatchIdOutput, message = ReturnMessage + " " +e.Message });
            }
            #endregion

            //Human Review Entries
            #region Create Human Review Entries
            try
            {
                var BWQEntities = _context.BWQEntities.Where(t => t.BWQID == BatchIdOutput);
                var Modules = _context.ApplicationModules;
                var QueueGuid = (from mods in Modules
                                 where mods.ModuleName == "BWQ"
                                 select mods.QueueGuid).FirstOrDefault();

                foreach (var bwqent in BWQEntities)
                {

                    var BWQEntityInstructionsObject = _context.BWQInstructions
                        .Where(t => t.BWQEntitiesID == bwqent.BWQEntitiesID);

                    var thisInstruction = BWQEntityInstructionsObject
                        .Select(x => new
                        {
                            BWQInstructionsID = x.BWQInstructionsID,
                            BWQEntitiesID = x.BWQEntitiesID,
                            BWQDispositionsID = x.BWQDispositionsID,
                            BWQFieldSelectID = x.BWQFieldSelectID,
                            Instructions = x.Instructions,
                            CreatedBy = x.CreatedBy,
                            DateCreatedUTC = x.DateCreatedUTC,
                            UpdatedBy = x.UpdatedBy,
                            LastUpdatedUTC = x.LastUpdatedUTC,
                            BWQEntities = "",
                            BWQDispositions = "",
                            BWQFieldSelect = ""
                        });


                    var JsonData = JsonConvert.SerializeObject(thisInstruction);

                    WorkItemRequest HRCreateRequest = new WorkItemRequest();
                    HRCreateRequest.name = "Instruction Entries for BWQ Entity " + bwqent.BWQEntitiesID + " and Profile ID " + bwqent.MMMEntityID;
                    HRCreateRequest.description = "Instruction Entries for BWQ Entity " + bwqent.BWQEntitiesID + " and Profile " + bwqent.MMMEntityID;
                    HRCreateRequest.queueGuid = QueueGuid;
                    HRCreateRequest.statusDetailTypeGuid = _configuration.GetSection("HumanReview:statusDetailTypeGuid_ins").Value;
                    HRCreateRequest.reviewTypeGuid = _configuration.GetSection("HumanReview:reviewTypeGuid_ins").Value;
                    HRCreateRequest.formDefinitionJson = JsonData;
                    HRCreateRequest.isActive = true;

                    //var returnGuid = getWorkItemForEntityAsync(HRCreateRequest, newbatch.HRToken);

                    var returnGuid = Common.getWorkItemAsync(HRCreateRequest, newbatch.HRToken, _configuration);

                    /*
                    if (returnGuid.value.workItemGuid == null)
                    {
                        var workitemnotcreated = new
                        {
                            Success = false,
                            Message = "WorkItem not created"
                        };
                        return BadRequest(workitemnotcreated);
                        // TODO: LOG THIS ERROR
                    }
                    */

                    if (returnGuid.value.workItemGuid == null)
                    {
                        var workitemnotcreated = new
                        {
                            Success = false,
                            Message = "WorkItem not created"
                        };

                        // delete the BWQ entry created above if WorkItemGuid is not created
                        using (var sqlCmd = _context.Database.GetDbConnection().CreateCommand())
                        {
                            string sp = "usp_DeleteBatch_del";

                            sqlCmd.CommandText = sp;
                            sqlCmd.CommandType = CommandType.StoredProcedure;
                            sqlCmd.Parameters.Add(new SqlParameter("@BWQID", SqlDbType.VarChar, 10) { Value = BatchIdOutput.ToString() });
                            // output params
                            SqlParameter Results = new SqlParameter("@Results", SqlDbType.VarChar, 500);
                            Results.Direction = ParameterDirection.Output;
                            sqlCmd.Parameters.Add(Results);
                            

                            if (sqlCmd.Connection.State != ConnectionState.Open)
                                sqlCmd.Connection.Open();

                            var execResult = sqlCmd.ExecuteNonQuery();
                            ReturnMessage = Results.Value.ToString();
                        }

                        return Json(workitemnotcreated + " - " + ReturnMessage);
                    }

                    bwqent.WorkItemID = new Guid(returnGuid.value.workItemGuid);
                };

                retValue = _context.SaveData();

                if (retValue.Message != "Success")
                { return Json(retValue); } // return error if workitemid was not updated for this bwq entity

            }
            catch (Exception e)
            {
                return BadRequest(new { batch = BatchIdOutput, message = e.Message});
            }
            #endregion

            return Ok(new { batch = BatchIdOutput, message = ReturnMessage });
            //return Ok(); 
        }

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
        #region Unused


     
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.BWQ.FirstOrDefault(t => t.BWQID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.BWQ.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<Models.BWQ.BWQ> modeltopatch)
        {
            var topatch = _context.BWQ.FirstOrDefault(t => t.BWQID == id);
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
        public IActionResult UpdateEntry([FromBody] Models.BWQ.BWQ objupd)
        {
            var targetObject = _context.BWQ.FirstOrDefault(t => t.BWQID == objupd.BWQID);
            if (targetObject == null)
            { return NotFound(); }

            _context.Entry(targetObject).CurrentValues.SetValues(objupd);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }
        #endregion

        */


    }
}
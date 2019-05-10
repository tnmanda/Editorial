using System.Linq;
using LNWCOE.Models.BWQ;
using LNWCOE.Models.Context;
using LNWCOE.Module.BWQ.Interface;
using Microsoft.EntityFrameworkCore;
using Repository.DataAccess;
using Newtonsoft.Json.Linq;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using LNWCOE.Service.Helpers;
using System.Data;
using System.Data.SqlClient;
using System;
using Newtonsoft.Json;
using LNWCOE.Models.HR;
using LNWCOE.Models.MMM;

namespace LNWCOE.Module.BWQ.Implementation
{
    public class BWQRepository : Repository<Bwq>, IBWQRepository
    {
        private new readonly EditorialDataContext _context;

        public BWQRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }

        public object GetBWQEntries()
        {
            var batches = _context.Bwq.Select(bwqs => new
            {
                bwqs.BatchName,

                Priority = (from priocoll in _context.CollectionItem
                            where priocoll.CollectionItemID == bwqs.PriorityCollectionItemID
                            select priocoll.ItemText).FirstOrDefault().ToString(),
                bwqs.BwqDescription,
                bwqs.DateCreatedUTC,
                bwqs.StartDateUTC,
                bwqs.DueDateUTC,
                Total = bwqs.OriginalCount,

                Remaining = 0,

                bwqs.BWQID,
                Status = (from statcoll in _context.CollectionItem
                          where statcoll.CollectionItemID == bwqs.StatusCollectionItemID
                          select statcoll.ItemText).FirstOrDefault().ToString(),

                bwqs.UpdatedBy,
                bwqs.LastUpdatedUTC,
                bwqs.CreatedBy,

                PercentComplete = 0
            });

            return batches;
        }

        public object GetById(int id)
        {
            var BatchItem = _context.Bwq
                .Where(x => x.BWQID == id)
                .Select(bwq => new
                {
                    bwq.BatchName,
                    bwq.BwqDescription,
                    bwq.BWQID,
                    bwq.CreatedBy,
                    bwq.DateCreatedUTC,
                    bwq.DueDateUTC,
                    bwq.LastUpdatedUTC,
                    bwq.UpdatedBy,
                    bwq.StartDateUTC,
                    bwq.OriginalCount,
                    bwq.PriorityCollectionItemID,
                    Priority = (from priocoll in _context.CollectionItem
                                where priocoll.CollectionItemID == bwq.PriorityCollectionItemID
                                select priocoll).FirstOrDefault(),
                    bwq.StatusCollectionItemID,
                    Status = (from statcoll in _context.CollectionItem
                              where statcoll.CollectionItemID == bwq.StatusCollectionItemID
                              select statcoll).FirstOrDefault()
                }).FirstOrDefault();

            return BatchItem;
        }

        /// <summary>
        /// BWQ Left Navigation pane
        /// SP usp_BWQGetNavigation_sel gathers information from the Editorial DB
        /// Script below groups the result BY Country, Category, Batch name and Aging
        /// All data shows all
        /// My Work shows data for the logged in Editorial user through the appuserid varible
        /// </summary>
        /// <param name="appuserid"></param>
        /// <returns></returns>
        public object GetNavCountsWithUser(int appuserid)
        {
            // All Data
            var barnavall = _context.BwqNavDataWithUser.AsNoTracking().FromSql($"usp_BWQGetNavigation_sel").ToList();

            // By Category
            #region By Category
            var funcNavDataAll = (from byfunction in barnavall
                                  group byfunction by new { byfunction.FunctionTypeName, byfunction.Aging } into Grouping
                                  select new
                                  {
                                      label = Grouping.Key.FunctionTypeName + " (" + Grouping.Count() + ")",
                                      //data = Grouping.Key.FunctionTypeName,
                                      data = new
                                      {
                                          categoryName = Grouping.Key.FunctionTypeName,
                                          aging = Grouping.Key.Aging,
                                      },
                                      children = from subg in Grouping
                                                 group subg by subg.CountryName into SubGrouping
                                                 select new
                                                 {
                                                     label = SubGrouping.Key + " (" + SubGrouping.Count() + ")",
                                                     data = new
                                                     {
                                                         countryName = SubGrouping.Key,
                                                         categoryName = Grouping.Key.FunctionTypeName,
                                                         batchName = "",
                                                         aging = Grouping.Key.Aging
                                                     }
                                                 }
                                  });

            #endregion
            //By Country
            #region By Country
            var counNavDataAll = (from bycountry in barnavall
                                  group bycountry by new { bycountry.CountryName, bycountry.Aging } into Grouping
                                  select new
                                  {
                                      label = Grouping.Key.CountryName + " (" + Grouping.Count() + ")",
                                      data = new 
                                      {
                                          countryName = Grouping.Key.CountryName,
                                          aging = Grouping.Key.Aging,
                                      },
                                      children = (from subg in Grouping
                                                  group subg by subg.FunctionTypeName into SubGrouping
                                                  select new
                                                  {
                                                      label = SubGrouping.Key + " (" + SubGrouping.Count() + ")",
                                                      data = new
                                                      {
                                                          countryName = Grouping.Key.CountryName,
                                                          categoryName = SubGrouping.Key,
                                                          batchName = "",
                                                          aging = Grouping.Key.Aging,
                                                      }
                                                  })
                                  }).OrderBy(x => x.label);

            #endregion
            // By Batch
            #region By Batch
            var bactNavDataAll = (from byfunction in barnavall
                                  group byfunction by byfunction.BatchName into Grouping
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
                            select new
                            {
                                label = ((Grouping.Key == 1) ? "11+ days" : "1-10 days") + " (" + Grouping.Count() + ")",
                                //data = (Grouping.Key == 1) ? "11+ days" : "1-10 days",
                                children = from subg in Grouping
                                           group subg by subg.CountryName into SubGrouping
                                           select new
                                           {
                                               label = SubGrouping.Key + " (" + SubGrouping.Count() + ")",
                                               data = new {
                                                   countryName = SubGrouping.Key,
                                                   aging = Grouping.Key,
                                               },
                                               //data = SubGrouping.Key + " (" + SubGrouping.Count() + ")",
                                               
                                               children = from subsubg in SubGrouping
                                                          group subsubg by subsubg.FunctionTypeName into SubSubGrouping
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

            /*
            var alldata1 = JObject.FromObject(new { label = "Batch", data = "Batch branch", children = bactNavDataAll });
            var alldata2 = JObject.FromObject(new { label = "Country", data = "Country branch", children = counNavDataAll });
            var alldata3 = JObject.FromObject(new { label = "Category", data = "Category branch", children = funcNavDataAll });
            var alldata4 = JObject.FromObject(new { label = "Aging", data = "Aging branch", children = agingAll });
            */
            var alldata1 = JObject.FromObject(new { label = "Batch", children = bactNavDataAll });
            var alldata2 = JObject.FromObject(new { label = "Country", children = counNavDataAll });
            var alldata3 = JObject.FromObject(new { label = "Category", children = funcNavDataAll });
            var alldata4 = JObject.FromObject(new { label = "Aging", children = agingAll });
            var alldata = JObject.FromObject(new { label = "All", children = new JArray(alldata4, alldata1, alldata2, alldata3) });

            //  My Work
            var barnavuser = _context.BwqNavDataWithUser.AsNoTracking().FromSql("usp_BWQGetNavigationWithUser_sel {0} ", appuserid).ToList();

            // By Category
            #region By Category
            var funcNavData = (from byfunction in barnavuser
                               group byfunction by new { byfunction.FunctionTypeName, byfunction.Aging } into Grouping
                               select new
                               {
                                   label = Grouping.Key.FunctionTypeName + " (" + Grouping.Count() + ")",
                                   //data = Grouping.Key.FunctionTypeName,
                                   data = new
                                   {
                                       categoryName = Grouping.Key.FunctionTypeName,
                                       aging = Grouping.Key.Aging,
                                       appUserID = appuserid
                                   },
                                   children = from subg in Grouping
                                              group subg by subg.CountryName into SubGrouping
                                              select new
                                              {
                                                  label = SubGrouping.Key + " (" + SubGrouping.Count() + ")",
                                                  data = new
                                                  {
                                                      countryName = SubGrouping.Key,
                                                      categoryName = Grouping.Key.FunctionTypeName,
                                                      batchName = "",
                                                      aging = Grouping.Key.Aging,
                                                      appUserID = appuserid
                                                  }
                                              }
                               });
            #endregion
            //By Country
            #region By Country
            var counNavData = (from bycountry in barnavuser
                               group bycountry by new { bycountry.CountryName, bycountry.Aging } into Grouping
                               select new
                               {
                                   label = Grouping.Key.CountryName + " (" + Grouping.Count() + ")",
                                   data = new
                                   {
                                       countryName = Grouping.Key.CountryName,
                                       aging = Grouping.Key.Aging,
                                       appUserID = appuserid
                                   },
                                   children = (from subg in Grouping
                                               group subg by subg.FunctionTypeName into SubGrouping
                                               select new
                                               {
                                                   label = SubGrouping.Key + " (" + SubGrouping.Count() + ")",
                                                   data = new
                                                   {
                                                       countryName = Grouping.Key.CountryName,
                                                       categoryName = SubGrouping.Key,
                                                       batchName = "",
                                                       aging = Grouping.Key.Aging,
                                                       appUserID = appuserid
                                                   }
                                               })
                               });
            #endregion
            // By Batch
            #region By Batch
            var bactNavData = (from byfunction in barnavuser
                               group byfunction by byfunction.BatchName into Grouping
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
                             select new
                             {
                                 label = ((Grouping.Key == 1) ? "11+ days" : "1-10 days") + " (" + Grouping.Count() + ")",
                                 //data = (Grouping.Key == 1) ? "11+ days" : "1-10 days",
                                 children = from subg in Grouping
                                            group subg by subg.CountryName into SubGrouping
                                            select new
                                            {
                                                label = SubGrouping.Key + " (" + SubGrouping.Count() + ")",
                                                //data = SubGrouping.Key + " (" + SubGrouping.Count() + ")",
                                                data = new
                                                {
                                                    countryName = SubGrouping.Key,
                                                    aging = Grouping.Key,
                                                    appUserID = appuserid
                                                },
                                                children = from subsubg in SubGrouping
                                                           group subsubg by subsubg.FunctionTypeName into SubSubGrouping
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

            /*
            var userdata1 = JObject.FromObject(new { label = "Batch", data = "Batch branch", children = bactNavData });
            var userdata2 = JObject.FromObject(new { label = "Country", data = "Country branch", children = counNavData });
            var userdata3 = JObject.FromObject(new { label = "Category", data = "Category branch", children = funcNavData });
            var userdata4 = JObject.FromObject(new { label = "Aging", data = "Aging branch", children = agingData });
            */
            var userdata1 = JObject.FromObject(new { label = "Batch", children = bactNavData });
            var userdata2 = JObject.FromObject(new { label = "Country", children = counNavData });
            var userdata3 = JObject.FromObject(new { label = "Category", children = funcNavData });
            var userdata4 = JObject.FromObject(new { label = "Aging", children = agingData });
            var alluserdata = JObject.FromObject(new { label = "My Work", children = new JArray(userdata4, userdata1, userdata2, userdata3) });

            var result = new JArray(alluserdata, alldata);

            return result;
        }


        public object CreateNewBatch(NewBatchObject newbatch, IConfiguration configuration)
        {
            bool DataValid = ValidateBatchData(newbatch, configuration);
            if (DataValid == false)
            {
                return null;
            }

            InstructionsCollection InstructionList = new InstructionsCollection();
            foreach (var ins in newbatch.Instructions)
            {
                InstructionList.Add(ins);
            }

            EntitiesCollection EntitiesList = new EntitiesCollection();
            foreach (var ent in newbatch.Ent_IDs)
            {
                EntitiesList.Add(ent);
            }

            int BatchIdOutput = 0;  // Will contain the ID of the created BWQ entry

            #region  Save Editorial Data

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

                if (NewBWQID.Value.ToString() == "") // failed to save Editorial Data
                {
                    return null;
                }

                BatchIdOutput = Convert.ToInt32(NewBWQID.Value);

            }
            #endregion



            #region Human Review Entries

            // Once the batch is created in Editorial we need to Update the entries with WorkItem Guids from Human Review   

            var BWQEntities = _context.BWQEntities.Where(t => t.BWQID == BatchIdOutput);
            var QueueGuid = (from module in _context.ApplicationModules
                             where module.ModuleName == EditorialModules.BWQ
                             select module.QueueGuid).FirstOrDefault();

            int WorkItemCount = 0;
            
            // Loop the Entities for this BWQID
            foreach (var bwqentity in BWQEntities)
            {
                var bwqInstruction = _context.BWQInstructions
                        .Where(t => t.BWQEntitiesID == bwqentity.BWQEntitiesID);

                // Serialize the corresponding Instruction for the BWQ Entity
                var JsonData = JsonConvert.SerializeObject(bwqInstruction);

                var QueueGuidString = QueueGuid.ToString();

                var HRCreateRequest = Helper.BuildHRWorkItemRequest(EditorialModules.BWQ,
                    QueueGuidString, JsonData,
                    configuration, null, HRRequestMode.Create);

                var GuidResult = Helper.GetHRWorkItem((WorkItemRequest)HRCreateRequest, newbatch.HRToken, configuration);

                if (GuidResult.Value.workItemGuid == null) // Delete the BWQ Entries above if Human Review WorkItems were not created
                {
                    using (var sqlCmd = _context.Database.GetDbConnection().CreateCommand())
                    {
                        string sp = "usp_DeleteBatch_del";

                        sqlCmd.CommandText = sp;
                        sqlCmd.CommandType = CommandType.StoredProcedure;
                        sqlCmd.Parameters.Add(new SqlParameter("@BWQID", SqlDbType.VarChar, 10) { Value = BatchIdOutput.ToString() });
                        // output params
                        SqlParameter Results = new SqlParameter("@Results", SqlDbType.VarChar, 500)
                        {
                            Direction = ParameterDirection.Output
                        };
                        sqlCmd.Parameters.Add(Results);

                        if (sqlCmd.Connection.State != ConnectionState.Open)
                            sqlCmd.Connection.Open();

                        var execResult = sqlCmd.ExecuteNonQuery();

                        return null;
                    }
                }

                bwqentity.WorkItemID = new Guid(GuidResult.Value.workItemGuid);
                WorkItemCount += 1;
            }

            if(WorkItemCount > 0)
            {
                _context.SaveChanges();
            }

            #endregion

            return BatchIdOutput;
        }
    

        private bool ValidateBatchData(NewBatchObject newdata, IConfiguration configuration)
        {

            var HRToken = new JwtSecurityToken(newdata.HRToken);

            if (Helper.TokenValid(HRToken) == false)
            {
                return false;
            }

            if (newdata.HRToken.Trim() == "")
            {
                return false;
            }
            if (newdata.Instructions.Count() < 1)
            {
                return false;
            }
            if (newdata.Ent_IDs.Count() < 1)
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
    }
}

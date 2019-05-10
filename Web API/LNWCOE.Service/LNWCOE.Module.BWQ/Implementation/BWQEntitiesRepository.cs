using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using LNWCOE.Models.BWQ;
using LNWCOE.Models.Context;
using LNWCOE.Models.HR;
using LNWCOE.Models.MMM;
using LNWCOE.Module.BWQ.Interface;
using LNWCOE.Service.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Repository.DataAccess;

namespace LNWCOE.Module.BWQ.Implementation
{
    public class BWQEntitiesRepository : Repository<BWQEntities>, IBWQEntitiesRepository
    {
        private new readonly EditorialDataContext _context;
        private readonly MMMDataContext _mmmcontext;

        public BWQEntitiesRepository(EditorialDataContext context, MMMDataContext mmmcontext) : base(context)
        {
            _context = context;
            _mmmcontext = mmmcontext;
        }

        public IEnumerable<BWQEntities> GetAllIncludingByName()
        {
            IQueryable<BWQEntities> data = base.GetAllIncludingByName("BWQ");
            return data;
        }

        public BWQEntities GetIdIncluding(int id)
        {
            BWQEntities query = base.GetAllIncludingByName("BWQ")
                .Where(x => x.BWQEntitiesID == id)
                .FirstOrDefault();
            return query;
        }

        public IEnumerable<BWQEntityData> FilterBWQEntities(BWQEntityFilter filter)
        {
            try
            {

            
            var result = _context.BWQEntityData
                    .AsNoTracking()
                    .FromSql("usp_GetBWQEntities_sel @countryName={0}, @categoryName={1}, @batchName={2}, @aging={3}, @appuser={4}", 
                                                    filter.CountryName,
                                                    filter.CategoryName,
                                                    filter.BatchName,
                                                    filter.Aging,
                                                    filter.AppUserID)
                    .Select(pg => new BWQEntityData
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

                return result;

            }
            catch (Exception ex)
            {
                // TODO Log this
                return null;
            }

            
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="wrkItemData"></param>
        /// <param name="configuration"></param>
        /// <returns></returns>
        public object GetWorkItemID(WorkItemPostData wrkItemData, IConfiguration configuration)
        {
            bool DataValid = ValidateWorkItemData(wrkItemData, configuration);
            if (DataValid == false)
            {
                return null;
            }

            string HRtoken = wrkItemData.Token;
            int TableEntryId = wrkItemData.ModuleTableEntryID;

            // Get the BWQ Entity entry
            var BwqEntity = _context.BWQEntities.Where(t => t.BWQEntitiesID == TableEntryId);
            if(BwqEntity.Count() < 1)
            {
                return null;
            }
        
            //Get the Guid if its defined
            var DefinedWorkItemGuid = (from bwqents in BwqEntity
                                       where bwqents.WorkItemID != null
                                       select bwqents.WorkItemID).FirstOrDefault().ToString();
            int WorkItemCount = 0;
            Guid GuidToSet;

            if (DefinedWorkItemGuid != "")
            {
                GuidToSet = new Guid(DefinedWorkItemGuid.ToString());
            }
            else
            {

                
                var QueueGuid = (from module in _context.ApplicationModules
                                 where module.ModuleName == EditorialModules.BWQ
                                 select module.QueueGuid).FirstOrDefault();

                var BWQEntityInstructions = _context.BWQInstructions.Where(t => t.BWQEntitiesID == TableEntryId);
                if (BWQEntityInstructions.Count() < 1)
                {
                    return null;
                }

                var JsonData = JsonConvert.SerializeObject(BWQEntityInstructions);

                var QueueGuidString = QueueGuid.ToString();

                //  This Section calls Human Review to Create the Workitem GUid for this Instruction entry

                var HRCreateRequest = Helper.BuildHRWorkItemRequest(EditorialModules.BWQ, QueueGuidString, JsonData, 
                    configuration, null, HRRequestMode.Create);

                var GuidResult = Helper.GetHRWorkItem((WorkItemRequest)HRCreateRequest, HRtoken, configuration);

                if (GuidResult.Value.workItemGuid == null)
                {
                    return null;
                }

                GuidToSet = new Guid(GuidResult.Value.workItemGuid);
            }

            foreach (var ent in BwqEntity)
            {
                if (ent.WorkItemID == null)
                {
                    WorkItemCount += 1;
                    ent.WorkItemID = GuidToSet;
                }
            }

            if (WorkItemCount > 0)
            {
                _context.SaveChanges();
                
            }

            return new { WorkItemGuid = GuidToSet };
        }

        public object GetInstructionsByGuid(Guid guid)
        {
            BWQEntities ThisBwqEntity = _context.BWQEntities.Where(t => t.WorkItemID == guid).FirstOrDefault();
            if (ThisBwqEntity == null)
            {
                return null;
            }

            // Get Entity Details from MMM DB
            Models.MMM.Entities ProfileEntityDetails = _mmmcontext.Entities.Where(t => t.Ent_ID == ThisBwqEntity.MMMEntityID).FirstOrDefault();
            if (ProfileEntityDetails == null)
            {
                return null;
            }
            // Get Instructions
            var result = from instructions in _context.BWQInstructions
                      join ents in _context.BWQEntities on instructions.BWQEntitiesID equals ents.BWQEntitiesID
                      join bwqs in _context.Bwq on ents.BWQID equals bwqs.BWQID
                      join bwqf in _context.BWQFieldSelect on instructions.BWQFieldSelectID equals bwqf.BWQFieldSelectID
                      where ents.BWQEntitiesID == ThisBwqEntity.BWQEntitiesID
                      select new
                      {
                          instructions.BWQInstructionsID,
                          instructions.BWQDispositionsID,
                          instructions.BWQEntitiesID,
                          instructions.BWQFieldSelectID,
                          instructions.BWQDispositions,
                          instructions.Instructions,
                          instructions.CreatedBy,
                          instructions.DateCreatedUTC,
                          instructions.UpdatedBy,
                          instructions.LastUpdatedUTC,
                          bwqs.BatchName,
                          WorkItemId = ents.WorkItemID,
                          Item = bwqf.FieldDisplayName,
                      };

            if (result.Count() < 1)
            {
                return null;
            }

            return new { Entity = ProfileEntityDetails, Instructions = result };
        }

        public object GetEntitiesFromFile(IFormFile file)
        {

            var result = new List<int>();
            using (var reader = new StreamReader(file.OpenReadStream()))
            {
                while (reader.Peek() >= 0)
                {
                    var SingleEntityId = reader.ReadLine();
                    try
                    {
                        result.Add(Convert.ToInt32(SingleEntityId));
                    }
                    catch
                    {
                        continue;
                    }
                }

            }

            var filteredEntities = _mmmcontext.Entities
                .Where(x => result.Contains(x.Ent_ID))
                .Select(entity => new MMMEntitiesShort
                {
                    Ent_ID = entity.Ent_ID,
                    Name = entity.Name,
                    EntryCategory = entity.EntryCategory,
                    EntrySubCategory = entity.EntrySubCategory,
                    Country = entity.Country
                });

            return filteredEntities;
        }

        private bool ValidateWorkItemData(WorkItemPostData newdata, IConfiguration configuration)
        {

            JwtSecurityToken HRToken = new JwtSecurityToken(newdata.Token);

            if (Helper.TokenValid(HRToken) == false)
            {
                return false;
            }
            if (newdata.ModuleTableEntryID == 0)
            {
                return false;
            }
            if (newdata.ProfileId == "")
            {
                return false;
            }
            if (newdata.Token == "")
            {
                return false;
            }

            // Get the Entity Detail from MMMDB, return if not found
            var EntityDetails = _mmmcontext.Entities.Where(t => t.Ent_ID == Convert.ToInt32(newdata.ProfileId)).FirstOrDefault();
            if (EntityDetails == null)
            {
                return false;
            }

            // Check if HR is up before calling HR routines
            ApiWebResponse hrResponse = Helper.GetHRServerStatus(configuration);
            // We expect a 400 - Bad Request, if 404 Not Found, return an error
            if (hrResponse.StatusCode == 404)
            {
                return false;
            }

            return true;
        }
    }
}

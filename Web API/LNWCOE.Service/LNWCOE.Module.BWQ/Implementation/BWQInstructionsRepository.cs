using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using LNWCOE.Models.BWQ;
using LNWCOE.Models.Context;
using LNWCOE.Models.HR;
using LNWCOE.Module.BWQ.Interface;
using LNWCOE.Service.Helpers;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Repository.DataAccess;

namespace LNWCOE.Module.BWQ.Implementation
{
    public class BWQInstructionsRepository : Repository<BWQInstructions>, IBWQInstructionsRepository
    {
        private new readonly EditorialDataContext _context;
        private readonly MMMDataContext _mmmcontext;

        public BWQInstructionsRepository(EditorialDataContext context, MMMDataContext mmmcontext) : base(context)
        {
            _context = context;
            _mmmcontext = mmmcontext;
        }

        public IEnumerable<BWQInstructions> GetAllIncludingByName()
        {
            IQueryable<BWQInstructions> data = base.GetAllIncludingByName("BWQEntities", "BWQDispositions", "BWQFieldSelect");
            return data;
        }

        public BWQInstructions GetIdIncluding(int id)
        {
            BWQInstructions query = base.GetAllIncludingByName("BWQEntities", "BWQDispositions", "BWQFieldSelect")
                .Where(x => x.BWQInstructionsID == id)
                .FirstOrDefault();
            return query;
        }

        public object UpdateInstruction(BWQInstructionsData editentry, IConfiguration configuration)
        {
            bool DataValid = ValidateBatchInstruction(editentry, configuration);
            if (DataValid == false)
            {
                return null;
            }

            int BWQEntityID = 0;
            int MMMProfileID = 0;
            string WorkItemGuid = "";

            #region Editorial section
            foreach (var updateobj in editentry.instructions)
            {
                var targetObject = _context.BWQInstructions.FirstOrDefault(t => t.BWQInstructionsID == updateobj.BWQInstructionsID);
                //check if instruction exists
                if (targetObject == null)
                {
                    return null;
                }
                //Instruction disposition can only be 2, "Open" fail otherwise
                if (!(targetObject.BWQDispositionsID == 2))
                {
                    return null;
                }

                var BWQEntity = _context.BWQEntities.FirstOrDefault(u => u.BWQEntitiesID == targetObject.BWQEntitiesID);
                if (BWQEntity == null)
                {
                    return null;
                }

                // TODO check the lock table if its still valid
                // WorkUnitTypeID == 6 is BWQ
                var thislock = _context.RecordLocks
                    .Where(v => v.WorkUnitTypeID == 6
                    && v.IDFromWorkUnitsDBTable == BWQEntity.BWQEntitiesID);

                foreach (var locks in thislock)
                {
                    if (locks.AppUserID != Convert.ToInt32(updateobj.UpdatedBy)) // record lock found for another user
                    {
                        var lockedToUser = _context.AppUser.FirstOrDefault(u => u.AppUserID == Convert.ToInt32(updateobj.UpdatedBy));
                        return null;
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
                WorkItemGuid = BWQEntity.WorkItemID.ToString();

                if (WorkItemGuid == "")
                {
                    return null;
                }
            }
            _context.SaveChanges(); // Save Editorial data

            #endregion

            #region Human Review Data
            
            var QueueGuid = (from module in _context.ApplicationModules
                             where module.ModuleName == EditorialModules.BWQ
                             select module.QueueGuid).FirstOrDefault();
            var QueueGuidString = QueueGuid.ToString();

            var JsonData = JsonConvert.SerializeObject(editentry.instructions);

            var HRCreateRequest = Helper.BuildHRWorkItemRequest(EditorialModules.BWQ,
                   QueueGuidString, JsonData,
                   configuration, WorkItemGuid, HRRequestMode.Update);

            var GuidResult = Helper.PutHRWorkItem((WorkItemPutRequest)HRCreateRequest, editentry.HRToken, configuration);

            #endregion

            return editentry.instructions;
        }

        private bool ValidateBatchInstruction(BWQInstructionsData newdata, IConfiguration configuration)
        {
            var HRToken = new JwtSecurityToken(newdata.HRToken);

            if (Helper.TokenValid(HRToken) == false)
            {
                return false;
            }
            if (newdata.instructions.Count() < 1)
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

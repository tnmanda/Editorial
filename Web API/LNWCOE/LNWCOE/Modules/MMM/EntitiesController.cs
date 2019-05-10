using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LNWCOE.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using LNWCOE.Models.BWQ;
using System.Data;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System;
using LNWCOE.Models.Entity;

namespace LNWCOE.Helpers.BWQ
{
    [Produces("application/json")]
    [Route("api/Entities")]
    [Authorize]
    public class EntitiesController : Controller
    {
        private readonly AppDbContext _context;
        private readonly MMMDBContext _MMMcontext;
        private readonly ILogger<EntitiesController> _logger;
        private IConfiguration _configuration;

        public EntitiesController(IConfiguration configuration, AppDbContext context, MMMDBContext MMMcontext, ILogger<EntitiesController> logger)
        {
            this._context = context;
            this._MMMcontext = MMMcontext;
            this._logger = logger;
            this._configuration = configuration;

        }

        
        [HttpPost]
        //public async System.Threading.Tasks.Task<IEnumerable<MMMEntitiesShort>> GetAsync([FromBody] EntityLookup lookup)
        public async System.Threading.Tasks.Task<List<MMMEntitiesShort>> GetMMMEntitiesAsync([FromBody] EntityLookup lookup)
        {
            try
            {
                string sp = "usp_GetEntities_sel";

                using (var sqlCmd = _context.Database.GetDbConnection().CreateCommand())
                {
                    sqlCmd.CommandText = sp;
                    sqlCmd.CommandType = CommandType.StoredProcedure;

                    sqlCmd.Parameters.Add(new SqlParameter("@DateEnteredFrom", SqlDbType.Date) { Value = lookup.DateEnteredFrom });
                    sqlCmd.Parameters.Add(new SqlParameter("@DateEnteredTo", SqlDbType.Date) { Value = lookup.DateEnteredTo });
                    sqlCmd.Parameters.Add(new SqlParameter("@DateUpdatedFrom", SqlDbType.Date) { Value = lookup.DateUpdatedFrom });
                    sqlCmd.Parameters.Add(new SqlParameter("@DateUpdatedTo", SqlDbType.Date) { Value = lookup.DateUpdatedTo });
                    sqlCmd.Parameters.Add(new SqlParameter("@LastReviewedDateFrom", SqlDbType.Date) { Value = lookup.LastReviewedDateFrom });
                    sqlCmd.Parameters.Add(new SqlParameter("@LastReviewedDateTo", SqlDbType.Date) { Value = lookup.LastReviewedDateTo });
                    sqlCmd.Parameters.Add(new SqlParameter("@EnteredBy", SqlDbType.VarChar) { Value = lookup.EnteredBy });
                    sqlCmd.Parameters.Add(new SqlParameter("@UpdatedBy", SqlDbType.VarChar) { Value = lookup.UpdatedBy });
                    sqlCmd.Parameters.Add(new SqlParameter("@ReviewedBy", SqlDbType.VarChar) { Value = lookup.ReviewedBy });
                    sqlCmd.Parameters.Add(new SqlParameter("@DOB", SqlDbType.Bit) { Value = lookup.DOB });
                    sqlCmd.Parameters.Add(new SqlParameter("@DOB2", SqlDbType.Bit) { Value = lookup.DOB2 });

                    sqlCmd.Parameters.Add(new SqlParameter("@NationalID", SqlDbType.Bit) { Value = lookup.NationalID });
                    sqlCmd.Parameters.Add(new SqlParameter("@OtherID", SqlDbType.Bit) { Value = lookup.OtherID });
                    sqlCmd.Parameters.Add(new SqlParameter("@PassportID", SqlDbType.Bit) { Value = lookup.PassportID });

                    sqlCmd.Parameters.Add(new SqlParameter("@EntitiesSourceID", SqlDbType.Int) { Value = lookup.EntitiesSourceID });
                    sqlCmd.Parameters.Add(new SqlParameter("@CountryID", SqlDbType.VarChar) { Value = lookup.CountryID });
                    sqlCmd.Parameters.Add(new SqlParameter("@EntryCategoryID", SqlDbType.Int) { Value = lookup.EntryCategoryID });
                    sqlCmd.Parameters.Add(new SqlParameter("@EntrySubCategoryID", SqlDbType.Int) { Value = lookup.EntrySubCategoryID });
                    sqlCmd.Parameters.Add(new SqlParameter("@EntitiesLevelsId", SqlDbType.Int) { Value = lookup.EntitiesLevelsId });

                    sqlCmd.Parameters.Add(new SqlParameter("@Positions", SqlDbType.VarChar) { Value = lookup.Positions });
                    sqlCmd.Parameters.Add(new SqlParameter("@Remarks", SqlDbType.VarChar) { Value = lookup.Remarks });

                    if (sqlCmd.Connection.State != ConnectionState.Open)
                        sqlCmd.Connection.Open();

                    using (var dataReader = await sqlCmd.ExecuteReaderAsync())
                    {
                        List<MMMEntitiesShort> ShortEntityList = new List<MMMEntitiesShort>();
                        while (await dataReader.ReadAsync())
                        {
                            MMMEntitiesShort shortentity = new MMMEntitiesShort()
                            {
                                Ent_ID = Convert.ToInt32(dataReader["Ent_ID"]),
                                Name = dataReader["Name"].ToString(),
                                EntryCategory = dataReader["EntryCategory"].ToString(),
                                EntrySubCategory = dataReader["EntrySubCategory"].ToString(),
                                Country = dataReader["Country"].ToString()
                            };

                            ShortEntityList.Add(shortentity);
                        }

                        return ShortEntityList;
                    }
                }
                
            }
            catch (Exception e)
            {
                // TODO: log
                var logInfo = e.Message;

                return new List<MMMEntitiesShort>();
            }

            //return new List<MMMEntitiesShort>();
        }

        [HttpGet("{entityId}")]
        public Entities Get(int entityId)
        {
            var ret = _MMMcontext.Entities
                .Where(x => x.Ent_ID == entityId);

            return ret.FirstOrDefault();
        }

        [HttpPost("name")]
        public Entities GetByName([FromBody] MMMEntityName ProfileName)
        {
            var ret = _MMMcontext.Entities
                .Where(x =>  x.Name.Trim().ToUpper() == ProfileName.Name.Trim().ToUpper());

            return ret.FirstOrDefault();
        }

    }
}
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using LNWCOE.Models.BWQ;
using LNWCOE.Models.Context;
using LNWCOE.Models.MMM;
using LNWCOE.Module.BWQ.Interface;
using Microsoft.EntityFrameworkCore;
using Repository.DataAccess;

namespace LNWCOE.Module.BWQ.Implementation
{
    public class EntitiesRepository : Repository<Entities>, IEntitiesRepository
    {
        private new readonly MMMDataContext _context;

        public EntitiesRepository(MMMDataContext context) : base(context)
        {
            _context = context;
        }

        public Entities GetEntityByName(MMMEntityName profileName)
        {
            Entities result = _context.Entities
               .Where(x => x.Name.Trim().ToUpper() == profileName.Name.Trim().ToUpper()).FirstOrDefault();

            return result;
        }

        //public async System.Threading.Tasks.Task<List<MMMEntitiesShort>> GetMMMEntitiesAsync(EntityLookup lookup)
        public List<MMMEntitiesShort> GetMMMEntitiesAsync(EntityLookup lookup)
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

                using (var dataReader = sqlCmd.ExecuteReader())
                {
                    List<MMMEntitiesShort> ShortEntityList = new List<MMMEntitiesShort>();
                    while (dataReader.Read())
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
    }
}

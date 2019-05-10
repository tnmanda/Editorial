using System.Collections.Generic;
using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Microsoft.EntityFrameworkCore;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Implementation
{
    public class AppUserRepository : Repository<AppUser>, IAppUserRepository
    {
        private new readonly EditorialDataContext _context;

        public AppUserRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<AppUser> GetAllIncludingByName()
        {
            var data = base.GetAllIncludingByName("Office", "OperationalRole", "Gender");
            return data;
        }

        public AppUser GetIdIncluding(int id)
        {
            var query = base.GetAllIncludingByName("Office", "OperationalRole", "Gender")
                .Where(x => x.AppUserID == id)
                .FirstOrDefault();
            return query;
        }

        public IEnumerable<UserDisplay> GetDisplay()
        {
            var result = _context.UserDisplay.AsNoTracking().FromSql("usp_UserDisplay_sel").
                Select(ud => new UserDisplay
                {
                    AppUserID = ud.AppUserID,
                    AppUserName = ud.AppUserName,
                    Email = ud.Email,
                    PhotoImage = ud.PhotoImage,
                    UTCOffset = ud.UTCOffset,
                    IsInternal = ud.IsInternal,
                    IsActive = ud.IsActive,
                    SupervisorAppUserID = ud.SupervisorAppUserID,
                    OfficeID = ud.OfficeID,
                    OperationalRoleTypeID = ud.OperationalRoleTypeID,
                    GenderTypeID = ud.GenderTypeID,
                    CreatedBy = ud.CreatedBy,
                    UpdatedBy = ud.UpdatedBy,
                    DateCreatedUTC = ud.DateCreatedUTC,
                    LastUpdatedUTC = ud.LastUpdatedUTC,
                    OfficeName = ud.OfficeName,
                    SupervisorName = ud.SupervisorName,
                    GenderName = ud.GenderName,
                    OperationalRoleName = ud.OperationalRoleName,
                    RoleTypeID = ud.RoleTypeID,
                    RoleTypeName = ud.RoleTypeName
                });


            return result.AsEnumerable();
        }

    }
}

using LNWCOE.Models.Admin;
using LNWCOE.Models.Auth;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Repository.DataAccess;
using System.Collections.Generic;
using System.Linq;

namespace LNWCOE.Module.Admin.Implementation
{
    public class HREditorialUserMapRepository : Repository<HREditorialUserMap>, IHREditorialUserMapRepository
    {
        private new readonly EditorialDataContext _context;

        public HREditorialUserMapRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<HREditorialUserMap> GetAllIncludingByName()
        {
            var data = base.GetAllIncludingByName("AppUser");
            return data;
        }

        public HREditorialUserMap GetIdIncluding(int id)
        {
            var query = base.GetAllIncludingByName("AppUser")
                .Where(x => x.HREditorialUserMapID == id)
                .FirstOrDefault();
            return query;
        }

        public AuthUserData GetAuthInfoByName(string username)
        {

            var rolequery = (from users in _context.AppUser
                             join roles in _context.AppUserInRole on users.AppUserID equals roles.AppUserID
                             join roletypes in _context.RoleType on roles.RoleTypeID equals roletypes.RoleTypeID
                             join hrmap in _context.HREditorialUserMap on users.AppUserID equals hrmap.AppUserID
                             where hrmap.HumanReviewUserID == username
                             select new { roletypes.RoleTypeID, users.AppUserName, users.AppUserID, users.Email });

            AuthUserData userData = null;
            var querydata = rolequery.FirstOrDefault();

            if (querydata != null)
            {
                userData = new AuthUserData
                {
                    RoleTypeID = querydata.RoleTypeID,
                    UserName = querydata.AppUserName,
                    AppUserId = querydata.AppUserID.ToString(),
                    Email = querydata.Email
                };
            }

            return userData;
        }
    }

}

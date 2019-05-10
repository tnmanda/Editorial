using System.Collections.Generic;
using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Implementation
{
    public class AppUserInRoleRepository : Repository<AppUserInRole>, IAppUserInRoleRepository
    {
        private new readonly EditorialDataContext _context;

        public AppUserInRoleRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<AppUserInRole> GetAllIncludingByName()
        {
            var data = base.GetAllIncludingByName("RoleType");
            return data;
        }

        public AppUserInRole GetIdIncluding(int id)
        {
            var query = base.GetAllIncludingByName("RoleType")
                .Where(x => x.AppUserInRoleID == id)
                .FirstOrDefault();
            return query;
        }

        public IEnumerable<AppUserInRole> GetByUser(int id)
        {
            var query = base.GetAllIncludingByName("RoleType")
                .Where(x => x.AppUserID == id);
            return query;
        }
    }
}

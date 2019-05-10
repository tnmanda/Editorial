using System.Collections.Generic;
using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Implementation
{
    public class AppUserTeamRepository : Repository<AppUserTeam>, IAppUserTeamRepository
    {
        private new readonly EditorialDataContext _context;

        public AppUserTeamRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<AppUserTeam> GetAllIncludingByName()
        {
            var data = base.GetAllIncludingByName("Team");
            return data;
        }

        public AppUserTeam GetIdIncluding(int id)
        {
            var query = base.GetAllIncludingByName("Team")
                .Where(x => x.AppUserTeamID == id)
                .FirstOrDefault();
            return query;
        }

        public IEnumerable<AppUserTeam> GetByUser(int id)
        {
            var query = base.GetAllIncludingByName("Team")
                .Where(x => x.AppUserID == id);
            return query;
        }
    }
}

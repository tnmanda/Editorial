using System.Collections.Generic;
using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Implementation
{
    public class AppUserResearchTeamRepository : Repository<AppUserResearchTeam>, IAppUserResearchTeamRepository
    {
        private new readonly EditorialDataContext _context;

        public AppUserResearchTeamRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<AppUserResearchTeam> GetByLeadUser(int id)
        {
            var query = base.GetAllIncludingByName("Country", "LanguageType", "Office", "Team", "LeadUser", "WorkUnitType")
                .Where(x => x.LeadUserID == id); 
            return query;
        }

        public IEnumerable<AppUserResearchTeam> GetAllIncludingByName()
        {
            var data = base.GetAllIncludingByName("Country", "LanguageType", "Office", "Team", "LeadUser", "WorkUnitType");

            return data;
        }

        public AppUserResearchTeam GetIdIncluding(int id)
        {
            var query = base.GetAllIncludingByName("Country", "LanguageType", "Office", "Team", "LeadUser", "WorkUnitType")
                .Where(x => x.AppUserResearchTeamID == id)
                .FirstOrDefault();
            return query;
        }

    }
}

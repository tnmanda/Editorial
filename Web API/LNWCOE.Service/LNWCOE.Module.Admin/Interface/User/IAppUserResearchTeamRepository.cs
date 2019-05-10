using System.Collections.Generic;
using LNWCOE.Models.Admin;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Interface
{
    public interface IAppUserResearchTeamRepository : IRepository<AppUserResearchTeam>
    {
        IEnumerable<AppUserResearchTeam> GetByLeadUser(int id);
        AppUserResearchTeam GetIdIncluding(int id);
        IEnumerable<AppUserResearchTeam> GetAllIncludingByName();
    }
}

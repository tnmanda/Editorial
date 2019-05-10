using System.Collections.Generic;
using LNWCOE.Models.Admin;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Interface
{
    public interface IAppUserTeamRepository : IRepository<AppUserTeam>
    {
        AppUserTeam GetIdIncluding(int id);
        IEnumerable<AppUserTeam> GetAllIncludingByName();
        IEnumerable<AppUserTeam> GetByUser(int id);
    }
}

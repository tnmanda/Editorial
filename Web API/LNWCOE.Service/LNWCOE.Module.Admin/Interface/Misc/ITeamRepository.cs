using System.Collections.Generic;
using LNWCOE.Models.Admin;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Interface
{
    public interface ITeamRepository : IRepository<Team>
    {
        Team GetIdIncluding(int id);
        IEnumerable<Team> GetAllIncludingByName();
    }
}

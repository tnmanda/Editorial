using System.Collections.Generic;
using LNWCOE.Models.Admin;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Interface
{
    public interface IAppUserTeamAssignmentRepository : IRepository<AppUserTeamAssignment>
    {
        AppUserTeamAssignment GetIdIncluding(int id);
        IEnumerable<AppUserTeamAssignment> GetAllIncludingByName();
        IEnumerable<AppUserTeamAssignment> GetByUser(int id);
    }
}

using System.Collections.Generic;
using LNWCOE.Models.Admin;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Interface
{
    public interface IAppUserInRoleRepository : IRepository<AppUserInRole>
    {
        AppUserInRole GetIdIncluding(int id);
        IEnumerable<AppUserInRole> GetAllIncludingByName();
        IEnumerable<AppUserInRole> GetByUser(int id);
    }
}

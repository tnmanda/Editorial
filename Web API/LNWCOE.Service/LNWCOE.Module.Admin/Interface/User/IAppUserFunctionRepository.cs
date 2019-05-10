using System.Collections.Generic;
using LNWCOE.Models.Admin;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Interface
{
    public interface IAppUserFunctionRepository : IRepository<AppUserFunction>
    {
        AppUserFunction GetIdIncluding(int id);
        IEnumerable<AppUserFunction> GetAllIncludingByName();
        IEnumerable<AppUserFunction> GetByUser(int id);
    }
}

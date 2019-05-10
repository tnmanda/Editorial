using System.Collections.Generic;
using LNWCOE.Models.Admin;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Interface
{
    public interface IAppUserContractRepository : IRepository<AppUserContract>
    {
        AppUserContract GetIdIncluding(int id);
        IEnumerable<AppUserContract> GetAllIncludingByName();
        IEnumerable<AppUserContract> GetByUser(int id);
    }
}

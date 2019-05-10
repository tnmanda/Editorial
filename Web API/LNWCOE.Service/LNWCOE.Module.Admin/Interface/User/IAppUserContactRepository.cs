using System.Collections.Generic;
using LNWCOE.Models.Admin;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Interface
{
    public interface IAppUserContactRepository : IRepository<AppUserContact>
    {
        AppUserContact GetIdIncluding(int id);
        IEnumerable<AppUserContact> GetAllIncludingByName();
        IEnumerable<AppUserContact> GetByUser(int id);
    }
}

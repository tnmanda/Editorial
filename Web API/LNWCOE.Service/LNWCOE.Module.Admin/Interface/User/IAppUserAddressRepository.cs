using System.Collections.Generic;
using LNWCOE.Models.Admin;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Interface
{
    public interface IAppUserAddressRepository : IRepository<AppUserAddress>
    {
        AppUserAddress GetIdIncluding(int id);
        IEnumerable<AppUserAddress> GetAllIncludingByName();
        IEnumerable<AppUserAddress> GetByUser(int id);
    }
}

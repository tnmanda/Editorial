using System.Collections.Generic;
using LNWCOE.Models.Admin;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Interface
{
    public interface IAppUserCountryRepository : IRepository<AppUserCountry>
    {
        AppUserCountry GetIdIncluding(int id);
        IEnumerable<AppUserCountry> GetAllIncludingByName();
        IEnumerable<AppUserCountry> GetByUser(int id);
    }
}

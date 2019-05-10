using System.Collections.Generic;
using LNWCOE.Models.Admin;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Interface
{
    public interface IAppUserLanguageRepository : IRepository<AppUserLanguage>
    {
        AppUserLanguage GetIdIncluding(int id);
        IEnumerable<AppUserLanguage> GetAllIncludingByName();
        IEnumerable<AppUserLanguage> GetByUser(int id);
    }
}

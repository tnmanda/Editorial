using System.Collections.Generic;
using LNWCOE.Models.Admin;
using LNWCOE.Models.Auth;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Interface
{
    public interface IHREditorialUserMapRepository : IRepository<HREditorialUserMap>
    {
        AuthUserData GetAuthInfoByName(string username);
        HREditorialUserMap GetIdIncluding(int id);
        IEnumerable<HREditorialUserMap> GetAllIncludingByName();

    }
}

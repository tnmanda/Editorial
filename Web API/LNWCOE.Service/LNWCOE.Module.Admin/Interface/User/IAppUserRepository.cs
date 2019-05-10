using System;
using System.Collections.Generic;
using System.Text;
using LNWCOE.Models.Admin;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Interface
{
    public interface IAppUserRepository : IRepository<AppUser>
    {
        AppUser GetIdIncluding(int id);
        IEnumerable<AppUser> GetAllIncludingByName();
        IEnumerable<UserDisplay> GetDisplay();
    }
}

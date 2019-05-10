using System.Collections.Generic;
using LNWCOE.Models.Admin;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Interface
{
    public interface IAppUserAbsenceRepository : IRepository<AppUserAbsence>
    {
        AppUserAbsence GetIdIncluding(int id);
        IEnumerable<AppUserAbsence> GetAllIncludingByName();
        IEnumerable<AppUserAbsence> GetByUser(int id);
    }
}

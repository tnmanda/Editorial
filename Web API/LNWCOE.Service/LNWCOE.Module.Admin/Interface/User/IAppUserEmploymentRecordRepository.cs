using System.Collections.Generic;
using LNWCOE.Models.Admin;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Interface
{
    public interface IAppUserEmploymentRecordRepository : IRepository<AppUserEmploymentRecord>
    {
        AppUserEmploymentRecord GetIdIncluding(int id);
        IEnumerable<AppUserEmploymentRecord> GetAllIncludingByName();
        IEnumerable<AppUserEmploymentRecord> GetByUser(int id);
    }
}

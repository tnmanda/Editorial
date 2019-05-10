using System.Collections.Generic;
using LNWCOE.Models.Admin;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Interface
{
    public interface IWorkUnitLockDurationInMinRepository : IRepository<WorkUnitLockDurationInMin>
    {
        WorkUnitLockDurationInMin GetIdIncluding(int id);
        IEnumerable<WorkUnitLockDurationInMin> GetAllIncludingByName();
    }
}

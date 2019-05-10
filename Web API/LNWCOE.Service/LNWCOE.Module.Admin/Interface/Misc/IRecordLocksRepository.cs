using LNWCOE.Models.Admin;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Interface
{
    public interface IRecordLocksRepository : IRepository<RecordLocks>
    {
        string Lock(LockEntry newlock);
        string Unlock(LockEntry newlock);
    }
}

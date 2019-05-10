using System.Collections.Generic;
using LNWCOE.Models.Admin;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Interface
{
    public interface IAppUserNoteRepository : IRepository<AppUserNote>
    {
        IEnumerable<AppUserNote> GetByUser(int id);
    }
}

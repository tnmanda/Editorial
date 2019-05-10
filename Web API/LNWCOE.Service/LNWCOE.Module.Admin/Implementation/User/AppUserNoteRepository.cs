using System.Collections.Generic;
using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Implementation
{
    public class AppUserNoteRepository : Repository<AppUserNote>, IAppUserNoteRepository
    {
        private new readonly EditorialDataContext _context;

        public AppUserNoteRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<AppUserNote> GetByUser(int id)
        {
            var query = base.GetAll()
                .Where(x => x.AppUserID == id);
            return query;
        }

    }
}

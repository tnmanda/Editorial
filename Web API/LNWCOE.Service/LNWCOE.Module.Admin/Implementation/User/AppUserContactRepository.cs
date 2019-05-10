using System.Collections.Generic;
using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Implementation
{
    public class AppUserContactRepository : Repository<AppUserContact>, IAppUserContactRepository
    {
        private new readonly EditorialDataContext _context;

        public AppUserContactRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<AppUserContact> GetAllIncludingByName()
        {
            var data = base.GetAllIncludingByName("ContactType");
            return data;
        }

        public AppUserContact GetIdIncluding(int id)
        {
            var query = base.GetAllIncludingByName("ContactType")
                .Where(x => x.AppUserContactID == id)
                .FirstOrDefault();
            return query;
        }

        public IEnumerable<AppUserContact> GetByUser(int id)
        {
            var query = base.GetAllIncludingByName("ContactType")
                .Where(x => x.AppUserID == id);
            return query;
        }
    }
}

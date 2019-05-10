using System.Collections.Generic;
using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Implementation
{
    public class AppUserCountryRepository : Repository<AppUserCountry>, IAppUserCountryRepository
    {
        private new readonly EditorialDataContext _context;

        public AppUserCountryRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<AppUserCountry> GetAllIncludingByName()
        {
            var data = base.GetAllIncludingByName("Country");
            return data;
        }

        public AppUserCountry GetIdIncluding(int id)
        {
            var query = base.GetAllIncludingByName("Country")
                .Where(x => x.AppUserCountryID == id)
                .FirstOrDefault();
            return query;
        }

        public IEnumerable<AppUserCountry> GetByUser(int id)
        {
            var query = base.GetAllIncludingByName("Country")
                .Where(x => x.AppUserID == id);
            return query;
        }
    }
}

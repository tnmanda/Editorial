using System.Collections.Generic;
using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Implementation
{
    public class AppUserAddressRepository : Repository<AppUserAddress>, IAppUserAddressRepository
    {
        private new readonly EditorialDataContext _context;

        public AppUserAddressRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<AppUserAddress> GetAllIncludingByName()
        {
            var data = base.GetAllIncludingByName("AddressType", "Country");
            return data;
        }

        public AppUserAddress GetIdIncluding(int id)
        {
            var query = base.GetAllIncludingByName("AddressType", "Country")
                .Where(x => x.AppUserAddressID == id)
                .FirstOrDefault();
            return query;
        }

        public IEnumerable<AppUserAddress> GetByUser(int id)
        {
            var query = base.GetAllIncludingByName("AddressType", "Country")
                .Where(x => x.AppUserID == id);
            return query;
        }
    }
}

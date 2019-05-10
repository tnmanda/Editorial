using LNWCOE.Models.Admin;
using LNWCOE.Models.Auth;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Repository.DataAccess;
using System.Collections.Generic;
using System.Linq;

namespace LNWCOE.Module.Admin.Implementation
{
    public class OfficeRepository : Repository<Office>, IOfficeRepository
    {
        private new readonly EditorialDataContext _context;

        public OfficeRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<Office> GetAllIncludingByName()
        {
            var data = base.GetAllIncludingByName("Country");
            return data;
        }

        public Office GetIdIncluding(int id)
        {
            var query = base.GetAllIncludingByName("Country")
                .Where(x => x.OfficeID == id)
                .FirstOrDefault();
            return query;
        }
    }
}

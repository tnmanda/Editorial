using System.Collections.Generic;
using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Implementation
{
    public class AppUserEmploymentRecordRepository : Repository<AppUserEmploymentRecord>, IAppUserEmploymentRecordRepository
    {
        private new readonly EditorialDataContext _context;

        public AppUserEmploymentRecordRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<AppUserEmploymentRecord> GetAllIncludingByName()
        {
            var data = base.GetAllIncludingByName("DepartureType", "ContractType");
            return data;
        }

        public AppUserEmploymentRecord GetIdIncluding(int id)
        {
            var query = base.GetAllIncludingByName("DepartureType", "ContractType")
                .Where(x => x.AppUserEmploymentRecordID == id)
                .FirstOrDefault();
            return query;
        }

        public IEnumerable<AppUserEmploymentRecord> GetByUser(int id)
        {
            var query = base.GetAllIncludingByName("DepartureType", "ContractType")
                .Where(x => x.AppUserID == id);
            return query;
        }
    }
}

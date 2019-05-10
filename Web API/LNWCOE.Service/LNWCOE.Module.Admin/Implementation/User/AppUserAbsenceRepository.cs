using LNWCOE.Models.Admin;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Repository.DataAccess;
using System.Collections.Generic;
using System.Linq;

namespace LNWCOE.Module.Admin.Implementation
{
    public class AppUserAbsenceRepository : Repository<AppUserAbsence>, IAppUserAbsenceRepository
    {
        private new readonly EditorialDataContext _context;

        public AppUserAbsenceRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<AppUserAbsence> GetAllIncludingByName()
        {
            var data = base.GetAllIncludingByName("AbsenceType");
            return data;
        }

        public AppUserAbsence GetIdIncluding(int id)
        {
            var query = base.GetAllIncludingByName("AbsenceType")
                .Where(x => x.AppUserAbsenceID == id)
                .FirstOrDefault();
            return query;
        }

        public IEnumerable<AppUserAbsence> GetByUser(int id)
        {
            var query = base.GetAllIncludingByName("AbsenceType")
                .Where(x => x.AppUserID == id);
            return query;
        }
    }
}

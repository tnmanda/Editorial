using System.Collections.Generic;
using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Implementation
{
    public class AppUserEducationRepository : Repository<AppUserEducation>, IAppUserEducationRepository
    {
        private new readonly EditorialDataContext _context;

        public AppUserEducationRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<AppUserEducation> GetAllIncludingByName()
        {
            var data = base.GetAllIncludingByName("EducationType");
            return data;
        }

        public AppUserEducation GetIdIncluding(int id)
        {
            var query = base.GetAllIncludingByName("EducationType")
                .Where(x => x.AppUserEducationID == id)
                .FirstOrDefault();
            return query;
        }

        public IEnumerable<AppUserEducation> GetByUser(int id)
        {
            var query = base.GetAllIncludingByName("EducationType")
                .Where(x => x.AppUserID == id);
            return query;
        }
    }
}

using System.Collections.Generic;
using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Implementation
{
    public class AppUserLanguageRepository : Repository<AppUserLanguage>, IAppUserLanguageRepository
    {
        private new readonly EditorialDataContext _context;

        public AppUserLanguageRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<AppUserLanguage> GetAllIncludingByName()
        {
            var data = base.GetAllIncludingByName("LanguageType", "ProficiencyType");
            return data;
        }

        public AppUserLanguage GetIdIncluding(int id)
        {
            var query = base.GetAllIncludingByName("LanguageType", "ProficiencyType")
                .Where(x => x.AppUserLanguageID == id)
                .FirstOrDefault();
            return query;
        }

        public IEnumerable<AppUserLanguage> GetByUser(int id)
        {
            var query = base.GetAllIncludingByName("LanguageType", "ProficiencyType")
                .Where(x => x.AppUserID == id);
            return query;
        }
    }
}

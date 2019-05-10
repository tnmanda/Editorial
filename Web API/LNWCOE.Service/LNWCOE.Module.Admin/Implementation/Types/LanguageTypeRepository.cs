using LNWCOE.Models.Admin;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Implementation
{
    public class LanguageTypeRepository : Repository<LanguageType>, ILanguageTypeRepository
    {
        private new readonly EditorialDataContext _context;

        public LanguageTypeRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }
    }

}

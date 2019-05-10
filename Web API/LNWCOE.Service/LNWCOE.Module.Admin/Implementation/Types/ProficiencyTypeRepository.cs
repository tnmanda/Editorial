using LNWCOE.Models.Admin;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Implementation
{
    public class ProficiencyTypeRepository : Repository<ProficiencyType>, IProficiencyTypeRepository
    {
        private new readonly EditorialDataContext _context;

        public ProficiencyTypeRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }
    }

}

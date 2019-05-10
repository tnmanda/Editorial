using LNWCOE.Models.Admin;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Implementation
{
    public class AbsenceTypeRepository : Repository<AbsenceType>, IAbsenceTypeRepository
    {
        private new readonly EditorialDataContext _context;

        public AbsenceTypeRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }
    }
}

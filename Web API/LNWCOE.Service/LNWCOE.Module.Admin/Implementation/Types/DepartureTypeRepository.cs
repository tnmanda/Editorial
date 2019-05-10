using LNWCOE.Models.Admin;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Implementation
{
    public class DepartureTypeRepository : Repository<DepartureType>, IDepartureTypeRepository
    {
        private new readonly EditorialDataContext _context;

        public DepartureTypeRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }
    }

}

using LNWCOE.Models.Admin;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Implementation
{
    public class GenderTypeRepository : Repository<GenderType>, IGenderTypeRepository
    {
        private new readonly EditorialDataContext _context;

        public GenderTypeRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }
    }

}

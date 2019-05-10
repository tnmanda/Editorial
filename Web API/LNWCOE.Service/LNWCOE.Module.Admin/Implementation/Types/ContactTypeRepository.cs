using LNWCOE.Models.Admin;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Implementation
{
    public class ContactTypeRepository : Repository<ContactType>, IContactTypeRepository
    {
        private new readonly EditorialDataContext _context;

        public ContactTypeRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }
    }
}

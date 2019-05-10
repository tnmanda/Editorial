using LNWCOE.Models.Admin.Pages;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Implementation
{
    public class ParentGroupRepository : Repository<ParentGroup>, IParentGroupRepository
    {
        private new readonly EditorialDataContext _context;

        public ParentGroupRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }

    }
}

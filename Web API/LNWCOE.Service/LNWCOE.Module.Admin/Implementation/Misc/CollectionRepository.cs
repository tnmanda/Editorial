using LNWCOE.Models.Admin;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Implementation
{
    public class CollectionRepository : Repository<Collection>, ICollectionRepository
    {
        private new readonly EditorialDataContext _context;

        public CollectionRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }
    }

}

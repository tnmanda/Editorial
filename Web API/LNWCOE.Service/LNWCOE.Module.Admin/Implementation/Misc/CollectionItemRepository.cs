using LNWCOE.Models.Admin;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Repository.DataAccess;
using System.Collections.Generic;
using System.Linq;

namespace LNWCOE.Module.Admin.Implementation
{
    public class CollectionItemRepository : Repository<CollectionItem>, ICollectionItemRepository
    {
        private new readonly EditorialDataContext _context;

        public CollectionItemRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<CollectionItem> GetAllIncludingByName()
        {
            var data = base.GetAllIncludingByName("Collection");
            return data;
        }

        public CollectionItem GetIdIncluding(int id)
        {
            var query = base.GetAllIncludingByName("Collection")
                .Where(x => x.CollectionItemID == id)
                .FirstOrDefault();
            return query;
        }

        public IEnumerable<CollectionItem> GetByColId(int id)
        {
            var result = base.GetAllIncludingByName("Collection")
               .Where(x => x.CollectionID == id);
            return result;
        }
    }
}

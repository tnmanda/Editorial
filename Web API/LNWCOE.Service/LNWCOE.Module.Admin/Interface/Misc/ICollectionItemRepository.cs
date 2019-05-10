using System.Collections.Generic;
using LNWCOE.Models.Admin;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Interface
{
    public interface ICollectionItemRepository : IRepository<CollectionItem>
    {
        CollectionItem GetIdIncluding(int id);
        IEnumerable<CollectionItem> GetAllIncludingByName();
        IEnumerable<CollectionItem> GetByColId(int id);
    }
}

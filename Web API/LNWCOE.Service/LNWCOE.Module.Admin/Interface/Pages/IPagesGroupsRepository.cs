using System.Collections.Generic;
using LNWCOE.Models.Admin.Pages;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Interface
{
    public interface IPagesGroupsRepository : IRepository<PagesGroups>
    {
        PagesGroups GetIdIncluding(int id);
        IEnumerable<PagesGroups> GetAllIncludingByName();
    }
}

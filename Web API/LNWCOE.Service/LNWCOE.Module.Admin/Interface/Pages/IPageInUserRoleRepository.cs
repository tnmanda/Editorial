using System.Collections.Generic;
using LNWCOE.Models.Admin.Pages;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Interface
{
    public interface IPageInUserRoleRepository : IRepository<PageInUserRole>
    {
        PageInUserRole GetIdIncluding(int id);
        IEnumerable<PageInUserRole> GetAllIncludingByName();
        IEnumerable<PagesEx> GetAllByRole(int id);
    }
}

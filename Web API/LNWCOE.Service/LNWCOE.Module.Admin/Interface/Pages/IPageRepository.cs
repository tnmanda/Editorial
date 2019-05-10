using System.Collections.Generic;
using LNWCOE.Models.Admin.Pages;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Interface
{
    public interface IPageRepository : IRepository<Pages>
    {
        Pages GetIdIncluding(int id);
        IEnumerable<Pages> GetAllIncludingByName();
        IEnumerable<PageGrouped> GetAllByUser(int id);
        IEnumerable<PageGrouped> GetAllByRole(int id);
    }
}

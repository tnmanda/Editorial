using System.Collections.Generic;
using LNWCOE.Models.Admin;
using LNWCOE.Models.Auth;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Interface
{
    public interface IOfficeRepository : IRepository<Office>
    {
        Office GetIdIncluding(int id);
        IEnumerable<Office> GetAllIncludingByName();
    }
}

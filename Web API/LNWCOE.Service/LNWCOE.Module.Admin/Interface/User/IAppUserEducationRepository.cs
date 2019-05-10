using System.Collections.Generic;
using LNWCOE.Models.Admin;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Interface
{
    public interface IAppUserEducationRepository : IRepository<AppUserEducation>
    {
        AppUserEducation GetIdIncluding(int id);
        IEnumerable<AppUserEducation> GetAllIncludingByName();
        IEnumerable<AppUserEducation> GetByUser(int id);
    }
}

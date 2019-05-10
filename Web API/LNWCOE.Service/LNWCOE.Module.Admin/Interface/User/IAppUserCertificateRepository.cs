using System.Collections.Generic;
using LNWCOE.Models.Admin;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Interface
{
    public interface IAppUserCertificateRepository : IRepository<AppUserCertificate>
    {
        AppUserCertificate GetIdIncluding(int id);
        IEnumerable<AppUserCertificate> GetAllIncludingByName();
        IEnumerable<AppUserCertificate> GetByUser(int id);
    }
}

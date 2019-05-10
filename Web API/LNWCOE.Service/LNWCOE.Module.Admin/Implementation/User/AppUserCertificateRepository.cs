using System.Collections.Generic;
using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Implementation
{
    public class AppUserCertificateRepository : Repository<AppUserCertificate>, IAppUserCertificateRepository
    {
        private new readonly EditorialDataContext _context;

        public AppUserCertificateRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<AppUserCertificate> GetAllIncludingByName()
        {
            var data = base.GetAllIncludingByName("CertificateType");
            return data;
        }

        public AppUserCertificate GetIdIncluding(int id)
        {
            var query = base.GetAllIncludingByName("CertificateType")
                .Where(x => x.AppUserCertificateID == id)
                .FirstOrDefault();
            return query;
        }

        public IEnumerable<AppUserCertificate> GetByUser(int id)
        {
            var query = base.GetAllIncludingByName("CertificateType")
                .Where(x => x.AppUserID == id);
            return query;
        }
    }
}

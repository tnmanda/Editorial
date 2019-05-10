using System.Collections.Generic;
using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Implementation
{
    public class AppUserContractRepository : Repository<AppUserContract>, IAppUserContractRepository
    {
        private new readonly EditorialDataContext _context;

        public AppUserContractRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<AppUserContract> GetAllIncludingByName()
        {
            var data = base.GetAllIncludingByName("ContractType");
            return data;
        }

        public AppUserContract GetIdIncluding(int id)
        {
            var query = base.GetAllIncludingByName("ContractType")
                .Where(x => x.AppUserContractID == id)
                .FirstOrDefault();
            return query;
        }

        public IEnumerable<AppUserContract> GetByUser(int id)
        {
            var query = base.GetAllIncludingByName("ContractType")
                .Where(x => x.AppUserID == id);
            return query;
        }
    }
}


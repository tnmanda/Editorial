using System.Collections.Generic;
using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Implementation
{
    public class AppUserFunctionRepository : Repository<AppUserFunction>, IAppUserFunctionRepository
    {
        private new readonly EditorialDataContext _context;

        public AppUserFunctionRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<AppUserFunction> GetAllIncludingByName()
        {
            var data = base.GetAllIncludingByName("FunctionType");
            return data;
        }

        public AppUserFunction GetIdIncluding(int id)
        {
            var query = base.GetAllIncludingByName("FunctionType")
                .Where(x => x.AppUserFunctionID == id)
                .FirstOrDefault();
            return query;
        }

        public IEnumerable<AppUserFunction> GetByUser(int id)
        {
            var query = base.GetAllIncludingByName("FunctionType")
                .Where(x => x.AppUserID == id);
            return query;
        }
    }
}

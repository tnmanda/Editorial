using System.Collections.Generic;
using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Implementation
{
    public class WorkUnitLockDurationInMinRepository : Repository<WorkUnitLockDurationInMin>, IWorkUnitLockDurationInMinRepository
    {
        private new readonly EditorialDataContext _context;

        public WorkUnitLockDurationInMinRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<WorkUnitLockDurationInMin> GetAllIncludingByName()
        {
            var data = base.GetAllIncludingByName("WorkUnitType");
            return data;
        }

        public WorkUnitLockDurationInMin GetIdIncluding(int id)
        {
            var query = base.GetAllIncludingByName("WorkUnitType")
                .Where(x => x.WorkLockDurationInMinID == id)
                .FirstOrDefault();
            return query;
        }

    }

}

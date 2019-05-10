using System.Collections.Generic;
using System.Linq;
using LNWCOE.Models.Admin;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Implementation
{
    public class AppUserTeamAssignmentRepository : Repository<AppUserTeamAssignment>, IAppUserTeamAssignmentRepository
    {
        private new readonly EditorialDataContext _context;

        public AppUserTeamAssignmentRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<AppUserTeamAssignment> GetAllIncludingByName()
        {
            var data = base.GetAllIncludingByName("AssignmentType", "Team");
            return data;
        }

        public AppUserTeamAssignment GetIdIncluding(int id)
        {
            var query = base.GetAllIncludingByName("AssignmentType", "Team")
                .Where(x => x.AppUserTeamAssignmentID == id)
                .FirstOrDefault();
            return query;
        }

        public IEnumerable<AppUserTeamAssignment> GetByUser(int id)
        {
            var query = base.GetAllIncludingByName("AssignmentType", "Team")
                .Where(x => x.AppUserID == id);
            return query;
        }
    }
}

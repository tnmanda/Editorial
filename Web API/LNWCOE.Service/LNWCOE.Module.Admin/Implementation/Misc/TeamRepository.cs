using LNWCOE.Models.Admin;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Repository.DataAccess;
using System.Collections.Generic;
using System.Linq;

namespace LNWCOE.Module.Admin.Implementation
{
    public class TeamRepository : Repository<Team>, ITeamRepository
    {
        private new readonly EditorialDataContext _context;

        public TeamRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<Team> GetAllIncludingByName()
        {
            var data = base.GetAllIncludingByName("Office", "LanguageType", "LeadUser");
            return data;
        }

        public Team GetIdIncluding(int id)
        {
            var query = base.GetAllIncludingByName("Office", "LanguageType", "LeadUser")
                .Where(x => x.TeamID == id)
                .FirstOrDefault();
            return query;
        }
    }
}

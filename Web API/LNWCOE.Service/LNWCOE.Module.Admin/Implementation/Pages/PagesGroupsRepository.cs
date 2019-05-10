using System.Linq;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Repository.DataAccess;
using System.Collections.Generic;
using LNWCOE.Models.Admin.Pages;
namespace LNWCOE.Module.Admin.Implementation
{
    public class PagesGroupsRepository : Repository<PagesGroups>, IPagesGroupsRepository
    {
        private new readonly EditorialDataContext _context;

        public PagesGroupsRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<PagesGroups> GetAllIncludingByName()
        {
            var data = base.GetAllIncludingByName("ParentGroup");
            return data;
        }

        public PagesGroups GetIdIncluding(int id)
        {
            var query = base.GetAllIncludingByName("ParentGroup")
                .Where(x => x.PagesGroupsID == id)
                .FirstOrDefault();
            return query;
        }
    }
}

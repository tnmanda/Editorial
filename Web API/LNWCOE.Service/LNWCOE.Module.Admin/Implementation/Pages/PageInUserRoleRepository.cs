using System.Collections.Generic;
using System.Linq;
using LNWCOE.Models.Admin.Pages;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Microsoft.EntityFrameworkCore;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Implementation
{
    public class PageInUserRoleRepository : Repository<PageInUserRole>, IPageInUserRoleRepository
    {
        private new readonly EditorialDataContext _context;

        public PageInUserRoleRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<PageInUserRole> GetAllIncludingByName()
        {
            var data = base.GetAllIncludingByName("Page", "Role");
            return data;
        }

        public PageInUserRole GetIdIncluding(int id)
        {
            var query = base.GetAllIncludingByName("Page", "Role")
                .Where(x => x.PageInUserRoleID == id)
                .FirstOrDefault();
            return query;
        }

        
        public IEnumerable<PagesEx> GetAllByRole(int id)
        {
            var result = _context.PagesEx.AsNoTracking().FromSql("usp_GetPagesByRole_sel {0}", id).
              Select(pg => new PagesEx
              {
                  PagesID = pg.PagesID,
                  PageName = pg.PageName,
                  FullPath = pg.FullPath,
                  IsActive = pg.IsActive,
                  PagesGroupsID = pg.PagesGroupsID,
                  PagesGroupsName = pg.PagesGroupsName,
                  RoleTypeID = pg.RoleTypeID,
                  RoleTypeName = pg.RoleTypeName,
                  PageInUserRoleID = pg.PageInUserRoleID
              });


            return result;
        }
        
    }
}

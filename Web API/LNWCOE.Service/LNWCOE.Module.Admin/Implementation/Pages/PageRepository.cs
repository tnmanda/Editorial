using System.Linq;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Repository.DataAccess;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using LNWCOE.Models.Admin.Pages;

namespace LNWCOE.Module.Admin.Implementation
{
    public class PageRepository : Repository<Pages>, IPageRepository
    {

        private new readonly EditorialDataContext _context;

        public PageRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<Pages> GetAllIncludingByName()
        {
            var data = base.GetAllIncludingByName("PagesGroups");
            return data;
        }

        public Pages GetIdIncluding(int id)
        {
            var query = base.GetAllIncludingByName("PagesGroups")
                .Where(x => x.PagesID == id)
                .FirstOrDefault();
            return query;
        }

        public IEnumerable<PageGrouped> GetAllByUser(int id)
        {
            IQueryable<PagesEx> result = _context.PagesEx.AsNoTracking().FromSql(@"usp_GetPagesByUser_sel {0}", id).
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

            var groupedresult = from so in result
                                group so by so.PagesGroupsName into ByGroup
                                select new PageGrouped
                                {
                                    PageGroup = ByGroup.Key,
                                    Pages = ByGroup.ToList()
                                };
            return (groupedresult);

        }

        public IEnumerable<PageGrouped> GetAllByRole(int id)
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

            var groupedresult = from so in result
                                group so by so.PagesGroupsName into ByGroup
                                select new PageGrouped
                                {
                                    PageGroup = ByGroup.Key,
                                    Pages = ByGroup.ToList()
                                };

            return groupedresult;
        }
    }

}

using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LNWCOE.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.Extensions.Logging;
using LNWCOE.Models.Admin.Page;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace LNWCOE.Helpers.Admin.Pages
{
    [Produces("application/json")]
    [Route("api/Page")]
    [Authorize]
    public class PageController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<PageController> _logger;

        public PageController(AppDbContext context, ILogger<PageController> logger)
        {
            this._context = context;
            this._logger = logger;
            ;
        }

        [HttpGet]
        public IEnumerable<Models.Admin.Page.Pages> Get()
        {
            var ret = _context.Pages
                .Include("PagesGroups")
                .ToList();
            return ret;
        }

        [HttpGet("{id}", Name = "GetPage")]
        public Models.Admin.Page.Pages Get(int id)
        {
            var ret = _context.Pages
                .Where(x => x.PagesID == id)
                .Include("PagesGroups");

            return ret.FirstOrDefault();
        }

        [HttpGet("user/{id}")]
        public JsonResult GetPagesForUser(int id)
        {
            /* by parent
            IQueryable<PagesEx> result = _context.PagesEx.FromSql(@"usp_GetPagesByUser_sel {0}", id).
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
                   ParentGroupID = pg.ParentGroupID,
                   ParentGroupName = pg.ParentGroupName,
                   PageInUserRoleID = pg.PageInUserRoleID
               });

            var groupedresult = from so in result
                                group so by so.ParentGroupName into GroupedbyParent
                                select new
                                {
                                    ParentGroup = GroupedbyParent.Key,
                                    PageGroups = from grp2 in GroupedbyParent
                                                 group grp2 by grp2.PagesGroupsName into GroupedbyGroupName
                                                 select new
                                                 {
                                                     PageGroup = GroupedbyGroupName.Key,
                                                     Pages = GroupedbyGroupName.ToList()
                                                 }
                                };
            */
            IQueryable<PagesEx> result = _context.PagesEx.FromSql(@"usp_GetPagesByUser_sel {0}", id).
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
                   //ParentGroupID = null,
                   //ParentGroupName = null,
                   PageInUserRoleID = pg.PageInUserRoleID
               });

            var groupedresult = from so in result
                                group so by so.PagesGroupsName into ByGroup
                                select new
                                {
                                    PageGroup = ByGroup.Key,
                                    Pages = ByGroup.ToList()
                                };

            return Json(groupedresult);
        }

        [HttpGet("role/{id}")]
        public JsonResult GetPagesForRole(int id)
        {
            /*
            var result = _context.PagesEx.FromSql("usp_GetPagesByRole_sel {0}",  id).
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
                   ParentGroupID = pg.ParentGroupID,
                   ParentGroupName = pg.ParentGroupName,
                   PageInUserRoleID = pg.PageInUserRoleID
               });

            var groupedresult = from so in result
                                group so by so.ParentGroupName into GroupedbyParent
                                select new
                                {
                                    ParentGroup = GroupedbyParent.Key,
                                    PageGroups = from grp2 in GroupedbyParent
                                            group grp2 by grp2.PagesGroupsName into GroupedbyGroupName
                                            select new
                                            {
                                                PageGroup = GroupedbyGroupName.Key,
                                                Pages = GroupedbyGroupName.ToList()
                                            }
                                };
                                */
            var result = _context.PagesEx.FromSql("usp_GetPagesByRole_sel {0}", id).
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
                               //ParentGroupID = null,
                               //ParentGroupName = null,
                               PageInUserRoleID = pg.PageInUserRoleID
                           });

            var groupedresult = from so in result
                                group so by so.PagesGroupsName into ByGroup
                                select new
                                {
                                    PageGroup = ByGroup.Key,
                                    Pages = ByGroup.ToList()
                                };
            return Json(groupedresult);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Models.Admin.Page.Pages newmodel)
        {
            if (ModelState.IsValid)
            {
                _context.Pages.Add(newmodel);
                _context.SaveChanges();

                return CreatedAtRoute("GetPage", new { id = newmodel.PagesID }, newmodel);
            }
            else
            { return BadRequest(); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.Pages.FirstOrDefault(t => t.PagesID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.Pages.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<Models.Admin.Page.Pages> modeltopatch)
        {
            var topatch = _context.Pages.FirstOrDefault(t => t.PagesID == id);
            if (topatch == null)
            { return NotFound(); }

            modeltopatch.ApplyTo(topatch);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPut]
        public IActionResult UpdateEntry([FromBody] Models.Admin.Page.Pages objWithUpdates)
        {
            var targetObject = _context.Pages.FirstOrDefault(t => t.PagesID == objWithUpdates.PagesID);
            if (targetObject == null)
            { return NotFound(); }

            _context.Entry(targetObject).CurrentValues.SetValues(objWithUpdates);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }
    }
}
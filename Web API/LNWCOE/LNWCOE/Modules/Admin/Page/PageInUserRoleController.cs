using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LNWCOE.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using LNWCOE.Models.Admin.Page;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace LNWCOE.Helpers.Admin.Pages
{
    [Produces("application/json")]
    [Route("api/PageInUserRole")]
    [Authorize]
    public class PageInUserRoleController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<PageInUserRoleController> _logger;

        public PageInUserRoleController(AppDbContext context, ILogger<PageInUserRoleController> logger )
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<PageInUserRole> Get()
        {
            var ret = _context.PageInUserRole.ToList();
            return ret;
        }

        [HttpGet("{id}", Name = "GetPageInRole")]
        public PageInUserRole Get(int id)
        {
            var ret = _context.PageInUserRole
                .Where(x => x.PageInUserRoleID == id)
                .Include("Page")
                .Include("Role");

            var single = ret.FirstOrDefault();

            return single;
        }

        [HttpGet("role/{id}")]
        public JsonResult GetPagesForRole(int id)
        {
            /*
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
                   ParentGroupID = pg.ParentGroupID,
                   ParentGroupName = pg.ParentGroupName,
                   PageInUserRoleID = pg.PageInUserRoleID
               });
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

            return Json(result);
        }

        [HttpPost]
        public IActionResult Create([FromBody] PageInUserRole newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.PageInUserRole.Add(newmodel);
                _context.SaveChanges();

                return CreatedAtRoute("GetPageInRole", new { id = newmodel.PageInUserRoleID }, newmodel);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.PageInUserRole.FirstOrDefault(t => t.PageInUserRoleID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.PageInUserRole.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<PageInUserRole> modeltopatch)
        {
            var topatch = _context.PageInUserRole.FirstOrDefault(t => t.PageInUserRoleID == id);
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
        public IActionResult UpdateEntry([FromBody] PageInUserRole objWithUpdates)
        {
            var targetObject = _context.PageInUserRole.FirstOrDefault(t => t.PageInUserRoleID == objWithUpdates.PageInUserRoleID);
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
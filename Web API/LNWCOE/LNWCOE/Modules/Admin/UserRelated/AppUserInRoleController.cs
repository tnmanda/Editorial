using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LNWCOE.Data;
using LNWCOE.Models.Admin;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace LNWCOE.Helpers.Admin
{
    [Produces("application/json")]
    [Route("api/AppUserInRole")]
    [Authorize]
    public class AppUserInRoleController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<AppUserInRoleController> _logger;

        public AppUserInRoleController(AppDbContext context, ILogger<AppUserInRoleController> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<AppUserInRole> Get()
        {
            var ret = _context.AppUserInRole.ToList();
            return ret;
        }

        [HttpGet("{id}", Name = "GetAppUserInRole")]
        public AppUserInRole Get(int id)
        {
            /*
            var ret = _context.AppUserInRole.FirstOrDefault(x => x.AppUserInRoleID == id);
            return ret;
            */
            var ret = _context.AppUserInRole
              .Where(x => x.AppUserInRoleID == id)
              .Include("RoleType");

            return ret.FirstOrDefault();
        }

        [HttpGet("user/{id}")]
        public IQueryable<AppUserInRole> GetByUser(int id)
        {
            /*
            var ret = _context.AppUserInRole.Where(x => x.AppUserID == id).ToList();
            return ret;
            */
            var ret = _context.AppUserInRole
              .Where(x => x.AppUserID == id)
              .Include("RoleType");

            return ret;
        }

        [HttpPost]
        public IActionResult Create([FromBody] AppUserInRole newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.AppUserInRole.Add(newmodel);
                _context.SaveChanges();

                return CreatedAtRoute("GetAppUserInRole", new { id = newmodel.AppUserInRoleID }, newmodel);
            }
            else
            { return BadRequest(); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.AppUserInRole.FirstOrDefault(t => t.AppUserInRoleID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.AppUserInRole.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<AppUserInRole> modeltopatch)
        {
            var topatch = _context.AppUserInRole.FirstOrDefault(t => t.AppUserInRoleID == id);
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
        public IActionResult UpdateEntry([FromBody] AppUserInRole objupd)
        {
            var targetObject = _context.AppUserInRole.FirstOrDefault(t => t.AppUserInRoleID == objupd.AppUserInRoleID);
            if (targetObject == null)
            { return NotFound(); }

            _context.Entry(targetObject).CurrentValues.SetValues(objupd);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }
    }
}
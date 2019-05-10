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
    [Route("api/AppUserTeamAssignment")]
    [Authorize]
    public class AppUserTeamAssignmentController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<AppUserTeamAssignmentController> _logger;

        public AppUserTeamAssignmentController(AppDbContext context, ILogger<AppUserTeamAssignmentController> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<AppUserTeamAssignment> Get()
        {
            var ret = _context.AppUserTeamAssignment.ToList();
            return ret;
        }

        [HttpGet("{id}", Name = "GetAppUserTeamAssignment")]
        public AppUserTeamAssignment Get(int id)
        {
            /*
            var ret = _context.AppUserTeamAssignment.FirstOrDefault(x => x.AppUserTeamAssignmentID == id);
            return ret;
            */
            var ret = _context.AppUserTeamAssignment
              .Where(x => x.AppUserTeamAssignmentID == id)
              .Include("AssignmentType")
              .Include("Team");

            return ret.FirstOrDefault();
        }

        [HttpGet("user/{id}")]
        public IQueryable<AppUserTeamAssignment> GetByUser(int id)
        {
            /*
            var ret = _context.AppUserTeamAssignment.Where(x => x.AppUserID == id).ToList();
            return ret;
            */
            var ret = _context.AppUserTeamAssignment
              .Where(x => x.AppUserTeamAssignmentID == id)
              .Include("AssignmentType")
              .Include("Team");

            return ret;
        }

        [HttpPost]
        public IActionResult Create([FromBody] AppUserTeamAssignment newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.AppUserTeamAssignment.Add(newmodel);
                _context.SaveChanges();

                return CreatedAtRoute("GetAppUserTeamAssignment", new { id = newmodel.AppUserTeamAssignmentID }, newmodel);
            }
            else
            { return BadRequest(); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.AppUserTeamAssignment.FirstOrDefault(t => t.AppUserTeamAssignmentID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.AppUserTeamAssignment.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<AppUserTeamAssignment> modeltopatch)
        {
            var topatch = _context.AppUserTeamAssignment.FirstOrDefault(t => t.AppUserTeamAssignmentID == id);
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
        public IActionResult UpdateEntry([FromBody] AppUserTeamAssignment objupd)
        {
            var targetObject = _context.AppUserTeamAssignment.FirstOrDefault(t => t.AppUserTeamAssignmentID == objupd.AppUserTeamAssignmentID);
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
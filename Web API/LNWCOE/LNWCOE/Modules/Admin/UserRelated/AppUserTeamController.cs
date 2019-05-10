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
    [Route("api/AppUserTeam")]
    [Authorize]
    public class AppUserTeamController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<AppUserTeamController> _logger;

        public AppUserTeamController(AppDbContext context, ILogger<AppUserTeamController> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<AppUserTeam> Get()
        {
            var ret = _context.AppUserTeam.ToList();
            return ret;
        }

        [HttpGet("{id}", Name = "GetAppUserTeam")]
        public AppUserTeam Get(int id)
        {
            /*
            var ret = _context.AppUserTeam.FirstOrDefault(x => x.AppUserTeamID == id);
            return ret;
            */
            var ret = _context.AppUserTeam
              .Where(x => x.AppUserTeamID == id)
              .Include("Team");

            return ret.FirstOrDefault();
        }

        [HttpGet("user/{id}")]
        public IQueryable<AppUserTeam> GetByUser(int id)
        {
            /*
            var ret = _context.AppUserTeam.Where(x => x.AppUserID == id).ToList();
            return ret;
            */
            var ret = _context.AppUserTeam
             .Where(x => x.AppUserID == id)
             .Include("Team");

            return ret;
        }

        [HttpPost]
        public IActionResult Create([FromBody] AppUserTeam newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.AppUserTeam.Add(newmodel);
                _context.SaveChanges();

                return CreatedAtRoute("GetAppUserTeam", new { id = newmodel.AppUserTeamID }, newmodel);
            }
            else
            { return BadRequest(); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.AppUserTeam.FirstOrDefault(t => t.AppUserTeamID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.AppUserTeam.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<AppUserTeam> modeltopatch)
        {
            var topatch = _context.AppUserTeam.FirstOrDefault(t => t.AppUserTeamID == id);
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
        public IActionResult UpdateEntry([FromBody] AppUserTeam objupd)
        {
            var targetObject = _context.AppUserTeam.FirstOrDefault(t => t.AppUserTeamID == objupd.AppUserTeamID);
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
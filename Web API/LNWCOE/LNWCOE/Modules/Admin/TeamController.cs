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
    [Route("api/Team")]
    [Authorize]
    public class TeamController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<TeamController> _logger;

        public TeamController(AppDbContext context, ILogger<TeamController> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<Team> Get()
        {
            var ret = _context.Team
                .Include("Office")
                .Include("LanguageType")
                .Include("LeadUser")
                .ToList();
            return ret;
        }

        [HttpGet("{id}", Name = "GetTeam")]
        public Team Get(int id)
        { 
            var ret = _context.Team
                .Include("Office")
                .Include("LanguageType")
                .Include("LeadUser")
                .FirstOrDefault(x => x.TeamID == id);
            return ret;
        }

        [HttpPost]
        public IActionResult Create([FromBody] Team newmodel)
        {
            if (ModelState.IsValid)
            {
                _context.Team.Add(newmodel);
                _context.SaveChanges();
                return CreatedAtRoute("GetTeam", new { id = newmodel.TeamID }, newmodel);
            }
            else
            { return BadRequest(); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.Team.FirstOrDefault(t => t.TeamID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.Team.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<Team> modeltopatch)
        {
            var topatch = _context.Team.FirstOrDefault(t => t.TeamID == id);
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
        public IActionResult UpdateEntry([FromBody] Team objupd)
        {
            var targetObject = _context.Team.FirstOrDefault(t => t.TeamID == objupd.TeamID);
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
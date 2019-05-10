using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LNWCOE.Data;
using LNWCOE.Models.Admin;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.Extensions.Logging;

namespace LNWCOE.Helpers.Admin
{
    [Produces("application/json")]
    [Route("api/AppUserResearchTeam")]
    [Authorize]
    public class AppUserResearchTeamController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<AppUserResearchTeamController> _logger;

        public AppUserResearchTeamController(AppDbContext context, ILogger<AppUserResearchTeamController> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<AppUserResearchTeam> Get()
        {
            var ret = _context.AppUserResearchTeam.ToList();
            return ret;
        }

        [HttpGet("{id}", Name = "GetAppUserResearchTeam")]
        public AppUserResearchTeam Get(int id)
        {
            var ret = _context.AppUserResearchTeam.FirstOrDefault(x => x.AppUserResearchTeamID == id);
            return ret;
        }


        [HttpPost]
        public IActionResult Create([FromBody] AppUserResearchTeam newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.AppUserResearchTeam.Add(newmodel);
                _context.SaveChanges();

                return CreatedAtRoute("GetAppUserResearchTeam", new { id = newmodel.AppUserResearchTeamID }, newmodel);
            }
            else
            { return BadRequest(); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.AppUserResearchTeam.FirstOrDefault(t => t.AppUserResearchTeamID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.AppUserResearchTeam.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<AppUserResearchTeam> modeltopatch)
        {
            var topatch = _context.AppUserResearchTeam.FirstOrDefault(t => t.AppUserResearchTeamID == id);
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
        public IActionResult UpdateEntry([FromBody] AppUserResearchTeam objupd)
        {
            var targetObject = _context.AppUserResearchTeam.FirstOrDefault(t => t.AppUserResearchTeamID == objupd.AppUserResearchTeamID);
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
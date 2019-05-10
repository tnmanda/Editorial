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
    [Route("api/AppUserAbsence")]
    [Authorize]
    public class AppUserAbsenceController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<AppUserAbsenceController> _logger;

        public AppUserAbsenceController(AppDbContext context, ILogger<AppUserAbsenceController> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<AppUserAbsence> Get()
        {
            var ret = _context.AppUserAbsence.ToList();
            return ret;
        }

        [HttpGet("{id}", Name = "GetAppUserAbsence")]
        public AppUserAbsence Get(int id)
        {
            /*
            var ret = _context.AppUserAbsence.FirstOrDefault(x => x.AppUserAbsenceID == id);
            return ret;
            */
            var ret = _context.AppUserAbsence
                .Where(x => x.AppUserAbsenceID == id)
                .Include("AbsenceType");

            return ret.FirstOrDefault();

        }

        [HttpGet("user/{id}")]
        public IQueryable<AppUserAbsence> GetByUser(int id)
        {
            /*
            var ret = _context.AppUserAbsence.Where(x => x.AppUserID == id).ToList();
            return ret;
            */
            var ret = _context.AppUserAbsence
                .Where(x => x.AppUserID == id)
                .Include("AbsenceType");

            return ret;
        }


        [HttpPost]
        public IActionResult Create([FromBody] AppUserAbsence newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.AppUserAbsence.Add(newmodel);
                _context.SaveChanges();

                return CreatedAtRoute("GetAppUserAbsence", new { id = newmodel.AppUserAbsenceID }, newmodel);
            }
            else
            { return BadRequest(); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.AppUserAbsence.FirstOrDefault(t => t.AppUserAbsenceID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.AppUserAbsence.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<AppUserAbsence> modeltopatch)
        {
            var topatch = _context.AppUserAbsence.FirstOrDefault(t => t.AppUserAbsenceID == id);
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
        public IActionResult UpdateEntry([FromBody] AppUserAbsence objupd)
        {
            var targetObject = _context.AppUserAbsence.FirstOrDefault(t => t.AppUserAbsenceID == objupd.AppUserAbsenceID);
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
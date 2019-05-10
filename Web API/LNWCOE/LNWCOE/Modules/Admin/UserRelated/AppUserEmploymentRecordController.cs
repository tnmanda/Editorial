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
    [Route("api/AppUserEmploymentRecord")]
    [Authorize]
    public class AppUserEmploymentRecordController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<AppUserEmploymentRecordController> _logger;

        public AppUserEmploymentRecordController(AppDbContext context, ILogger<AppUserEmploymentRecordController> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<AppUserEmploymentRecord> Get()
        {
            var ret = _context.AppUserEmploymentRecord.ToList();
            return ret;
        }

        [HttpGet("{id}", Name = "GetAppUserEmploymentRecord")]
        public AppUserEmploymentRecord Get(int id)
        {
            /*
            var ret = _context.AppUserEmploymentRecord.FirstOrDefault(x => x.AppUserEmploymentRecordID == id);
            return ret;
            */
            var ret = _context.AppUserEmploymentRecord
              .Where(x => x.AppUserEmploymentRecordID == id)
              .Include("DepartureType")
              .Include("ContractType");

            return ret.FirstOrDefault();
        }

        [HttpGet("user/{id}")]
        public IQueryable<AppUserEmploymentRecord> GetByUser(int id)
        {
            /*
            var ret = _context.AppUserEmploymentRecord.Where(x => x.AppUserID == id).ToList();
            return ret;
            */
            var ret = _context.AppUserEmploymentRecord
              .Where(x => x.AppUserID == id)
              .Include("DepartureType")
              .Include("ContractType");

            return ret;
        }

        [HttpPost]
        public IActionResult Create([FromBody] AppUserEmploymentRecord newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.AppUserEmploymentRecord.Add(newmodel);
                _context.SaveChanges();

                return CreatedAtRoute("GetAppUserEmploymentRecord", new { id = newmodel.AppUserEmploymentRecordID }, newmodel);
            }
            else
            { return BadRequest(); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.AppUserEmploymentRecord.FirstOrDefault(t => t.AppUserEmploymentRecordID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.AppUserEmploymentRecord.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<AppUserEmploymentRecord> modeltopatch)
        {
            var topatch = _context.AppUserEmploymentRecord.FirstOrDefault(t => t.AppUserEmploymentRecordID == id);
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
        public IActionResult UpdateEntry([FromBody] AppUserEmploymentRecord objupd)
        {
            var targetObject = _context.AppUserEmploymentRecord.FirstOrDefault(t => t.AppUserEmploymentRecordID == objupd.AppUserEmploymentRecordID);
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
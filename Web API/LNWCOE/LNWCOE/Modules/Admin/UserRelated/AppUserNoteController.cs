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
    [Route("api/AppUserNote")]
    [Authorize]
    public class AppUserNoteController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<AppUserNoteController> _logger;

        public AppUserNoteController(AppDbContext context, ILogger<AppUserNoteController> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<AppUserNote> Get()
        {
            var ret = _context.AppUserNote.ToList();
            return ret;
        }

        [HttpGet("{id}", Name = "GetAppUserNote")]
        public AppUserNote Get(int id)
        {
            /*
            var ret = _context.AppUserNote.FirstOrDefault(x => x.AppUserNoteID == id);
            return ret;
            */
            var ret = _context.AppUserNote
              .Where(x => x.AppUserNoteID == id);

            return ret.FirstOrDefault();
        }

        [HttpGet("user/{id}")]
        public IQueryable<AppUserNote> GetByUser(int id)
        {
            /*
            var ret = _context.AppUserNote.Where(x => x.AppUserID == id).ToList();
            return ret;
            */
            var ret = _context.AppUserNote
             .Where(x => x.AppUserID == id);

            return ret;
        }

        [HttpPost]
        public IActionResult Create([FromBody] AppUserNote newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.AppUserNote.Add(newmodel);
                _context.SaveChanges();

                return CreatedAtRoute("GetAppUserNote", new { id = newmodel.AppUserNoteID }, newmodel);
            }
            else
            { return BadRequest(); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.AppUserNote.FirstOrDefault(t => t.AppUserNoteID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.AppUserNote.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<AppUserNote> modeltopatch)
        {
            var topatch = _context.AppUserNote.FirstOrDefault(t => t.AppUserNoteID == id);
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
        public IActionResult UpdateEntry([FromBody] AppUserNote objupd)
        {
            var targetObject = _context.AppUserNote.FirstOrDefault(t => t.AppUserNoteID == objupd.AppUserNoteID);
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
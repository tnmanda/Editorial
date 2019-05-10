using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LNWCOE.Data;
using Microsoft.AspNetCore.Authorization;
using LNWCOE.Models.INV;
using LNWCOE.Helpers;
using Microsoft.AspNetCore.JsonPatch;

//use

namespace LNWCOE.Modules.INV
{
    [Produces("application/json")]
    [Route("api/InvestigationNote")]
    [Authorize]
    public class InvestigationNoteController : Controller
    {
        private readonly AppDbContext _context;

        public InvestigationNoteController(AppDbContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public IEnumerable<InvestigationNote> Get()
        {
            var ret = _context.InvestigationNote.ToList();
            return ret;
        }

        [HttpGet("{id}", Name = "GetInvestigationNote")]
        public InvestigationNote Get(int id)
        {
            var ret = _context.InvestigationNote
                .Where(x => x.InvestigationNoteID == id);

            return ret.FirstOrDefault();
        }

        [HttpGet("inv/{id}", Name = "GetNoteByInvID")]
        public IQueryable<InvestigationNote> GetNoteByInvID(int invId)
        {
            var ret = _context.InvestigationNote
                .Where(x => x.InvestigationID == invId);

            return ret;
        }




        [HttpPost]
        public IActionResult Create([FromBody] InvestigationNote newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.InvestigationNote.Add(newmodel);
                ReturnData ret;
                ret = _context.SaveData();

                if (ret.Message == "Success")
                {
                    return CreatedAtRoute("GetInvestigationNote", new { id = newmodel.InvestigationNoteID }, newmodel);
                }

                return NotFound(ret);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.InvestigationNote.FirstOrDefault(t => t.InvestigationNoteID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.InvestigationNote.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<InvestigationNote> modeltopatch)
        {
            var topatch = _context.InvestigationNote.FirstOrDefault(t => t.InvestigationNoteID == id);
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
        public IActionResult UpdateEntry([FromBody] InvestigationNote objupd)
        {
            var targetObject = _context.InvestigationNote.FirstOrDefault(t => t.InvestigationNoteID == objupd.InvestigationNoteID);
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
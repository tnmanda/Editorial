using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LNWCOE.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using LNWCOE.Models.INV;
using LNWCOE.Helpers;
using Microsoft.AspNetCore.JsonPatch;

//use

namespace LNWCOE.Modules.INV
{
    [Produces("application/json")]
    [Route("api/InvestigationDispositions")]
    [Authorize]
    public class InvestigationDispositionsController : Controller
    {
        private readonly AppDbContext _context;

        public InvestigationDispositionsController(AppDbContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public IEnumerable<InvestigationDispositions> Get()
        {
            var ret = _context.InvestigationDispositions.ToList();
            return ret;
        }

        [HttpGet("{id}", Name = "GetInvestigationDispositions")]
        public InvestigationDispositions Get(int id)
        {
            var ret = _context.InvestigationDispositions
                .Where(x => x.InvestigationDispositionsID == id);

            return ret.FirstOrDefault();
        }

        [HttpPost]
        public IActionResult Create([FromBody] InvestigationDispositions newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.InvestigationDispositions.Add(newmodel);
                ReturnData ret;
                ret = _context.SaveData();

                if (ret.Message == "Success")
                {
                    return CreatedAtRoute("GetInvestigationDispositions", new { id = newmodel.InvestigationDispositionsID }, newmodel);
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
            var todelete = _context.InvestigationDispositions.FirstOrDefault(t => t.InvestigationDispositionsID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.InvestigationDispositions.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<InvestigationDispositions> modeltopatch)
        {
            var topatch = _context.InvestigationDispositions.FirstOrDefault(t => t.InvestigationDispositionsID == id);
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
        public IActionResult UpdateEntry([FromBody] InvestigationDispositions objupd)
        {
            var targetObject = _context.InvestigationDispositions.FirstOrDefault(t => t.InvestigationDispositionsID == objupd.InvestigationDispositionsID);
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
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
    [Route("api/InvestigationActivity")]
    [Authorize]
    public class InvestigationActivityController : Controller
    {
        private readonly AppDbContext _context;

        public InvestigationActivityController(AppDbContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public IEnumerable<InvestigationActivity> Get()
        {
            var ret = _context.InvestigationActivity.ToList();
            return ret;
        }

        [HttpGet("{id}", Name = "GetInvestigationActivity")]
        public InvestigationActivity Get(int id)
        {
            var ret = _context.InvestigationActivity
                .Where(x => x.InvestigationActivityID == id);

            return ret.FirstOrDefault();
        }

        [HttpPost]
        public IActionResult Create([FromBody] InvestigationActivity newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.InvestigationActivity.Add(newmodel);
                ReturnData ret;
                ret = _context.SaveData();

                if (ret.Message == "Success")
                {
                    return CreatedAtRoute("GetInvestigationActivity", new { id = newmodel.InvestigationActivityID }, newmodel);
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
            var todelete = _context.InvestigationActivity.FirstOrDefault(t => t.InvestigationActivityID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.InvestigationActivity.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<InvestigationActivity> modeltopatch)
        {
            var topatch = _context.InvestigationActivity.FirstOrDefault(t => t.InvestigationActivityID == id);
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
        public IActionResult UpdateEntry([FromBody] InvestigationActivity objupd)
        {
            var targetObject = _context.InvestigationActivity.FirstOrDefault(t => t.InvestigationActivityID == objupd.InvestigationActivityID);
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
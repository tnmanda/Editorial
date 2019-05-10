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
    [Route("api/InvestigationStatus")]
    [Authorize]
    public class InvestigationStatusController : Controller
    {
        private readonly AppDbContext _context;
        //private readonly ILogger<InvestigationStatusController> _logger;

        //public InvestigationStatusController(AppDbContext context, ILogger<InvestigationStatusController> logger)
        public InvestigationStatusController(AppDbContext context)
        {
            this._context = context;
            //this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<InvestigationStatus> Get()
        {
            var ret = _context.InvestigationStatus.ToList();
            return ret;
        }

        [HttpGet("{id}", Name = "GetInvestigationStatus")]
        public InvestigationStatus Get(int id)
        {
            var ret = _context.InvestigationStatus
                .Where(x => x.InvestigationStatusID == id);

            return ret.FirstOrDefault();
        }

        [HttpPost]
        public IActionResult Create([FromBody] InvestigationStatus newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.InvestigationStatus.Add(newmodel);
                ReturnData ret;
                ret = _context.SaveData();

                if (ret.Message == "Success")
                {
                    return CreatedAtRoute("GetInvestigationStatus", new { id = newmodel.InvestigationStatusID }, newmodel);
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
            var todelete = _context.InvestigationStatus.FirstOrDefault(t => t.InvestigationStatusID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.InvestigationStatus.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<InvestigationStatus> modeltopatch)
        {
            var topatch = _context.InvestigationStatus.FirstOrDefault(t => t.InvestigationStatusID == id);
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
        public IActionResult UpdateEntry([FromBody] InvestigationStatus objupd)
        {
            var targetObject = _context.InvestigationStatus.FirstOrDefault(t => t.InvestigationStatusID == objupd.InvestigationStatusID);
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
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
    [Route("api/AlertWorkers")]
    [Authorize]
    public class AlertWorkersController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<AlertWorkersController> _logger;

        public AlertWorkersController(AppDbContext context, ILogger<AlertWorkersController> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<AlertWorkers> Get()
        {
            var ret = _context.AlertWorkers.ToList();
            return ret;
        }

        [HttpGet("{id}", Name = "GetAlertWorkers")]
        public AlertWorkers Get(int id)
        {
            var ret = _context.AlertWorkers.FirstOrDefault(x => x.AlertWorkersID == id);
            return ret;
        }

        [HttpPost]
        public IActionResult Create([FromBody] AlertWorkers newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.AlertWorkers.Add(newmodel);
                _context.SaveChanges();

                return CreatedAtRoute("GetAlertWorkers", new { id = newmodel.AlertWorkersID }, newmodel);
            }
            else
            { return BadRequest(); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.AlertWorkers.FirstOrDefault(t => t.AlertWorkersID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.AlertWorkers.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<AlertWorkers> modeltopatch)
        {
            var topatch = _context.AlertWorkers.FirstOrDefault(t => t.AlertWorkersID == id);
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
        public IActionResult UpdateEntry([FromBody] AlertWorkers objupd)
        {
            var targetObject = _context.AlertWorkers.FirstOrDefault(t => t.AlertWorkersID == objupd.AlertWorkersID);
            if (targetObject == null)
            { return NotFound(); }

            _context.Entry(targetObject).CurrentValues.SetValues(objupd);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }
        //
    }
}
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
    [Route("api/AlertSchedules")]
    [Authorize]
    public class AlertSchedulesController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<AlertSchedulesController> _logger;

        public AlertSchedulesController(AppDbContext context, ILogger<AlertSchedulesController> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<AlertSchedules> Get()
        {
            var ret = _context.AlertSchedules.ToList();
            return ret;
        }

        [HttpGet("{id}", Name = "GetAlertSchedules")]
        public AlertSchedules Get(int id)
        {
            var ret = _context.AlertSchedules.FirstOrDefault(x => x.AlertSchedulesId == id);
            return ret;
        }

        [HttpPost]
        public IActionResult Create([FromBody] AlertSchedules newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.AlertSchedules.Add(newmodel);
                _context.SaveChanges();

                return CreatedAtRoute("GetAlertSchedules", new { id = newmodel.AlertSchedulesId }, newmodel);
            }
            else
            { return BadRequest(); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.AlertSchedules.FirstOrDefault(t => t.AlertSchedulesId == id);
            if (todelete == null)
            { return NotFound(); }

            _context.AlertSchedules.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<AlertSchedules> modeltopatch)
        {
            var topatch = _context.AlertSchedules.FirstOrDefault(t => t.AlertSchedulesId == id);
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
        public IActionResult UpdateEntry([FromBody] AlertSchedules objupd)
        {
            var targetObject = _context.AlertSchedules.FirstOrDefault(t => t.AlertSchedulesId == objupd.AlertSchedulesId);
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
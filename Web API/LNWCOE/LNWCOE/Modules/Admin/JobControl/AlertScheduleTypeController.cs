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
    [Route("api/AlertScheduleType")]
    [Authorize]
    public class AlertScheduleTypeController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<AlertScheduleTypeController> _logger;

        public AlertScheduleTypeController(AppDbContext context, ILogger<AlertScheduleTypeController> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<AlertScheduleType> Get()
        {
            var ret = _context.AlertScheduleType.ToList();
            return ret;
        }

        [HttpGet("{id}", Name = "GetAlertScheduleType")]
        public AlertScheduleType Get(int id)
        {
            var ret = _context.AlertScheduleType.FirstOrDefault(x => x.AlertScheduleTypeID == id);
            return ret;
        }

        [HttpPost]
        public IActionResult Create([FromBody] AlertScheduleType newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.AlertScheduleType.Add(newmodel);
                _context.SaveChanges();

                return CreatedAtRoute("GetAlertScheduleType", new { id = newmodel.AlertScheduleTypeID }, newmodel);
            }
            else
            { return BadRequest(); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.AlertScheduleType.FirstOrDefault(t => t.AlertScheduleTypeID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.AlertScheduleType.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<AlertScheduleType> modeltopatch)
        {
            var topatch = _context.AlertScheduleType.FirstOrDefault(t => t.AlertScheduleTypeID == id);
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
        public IActionResult UpdateEntry([FromBody] AlertScheduleType objupd)
        {
            var targetObject = _context.AlertScheduleType.FirstOrDefault(t => t.AlertScheduleTypeID == objupd.AlertScheduleTypeID);
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
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
    [Route("api/AlertSourceType")]
    [Authorize]
    public class AlertSourceTypeController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<AlertSourceTypeController> _logger;

        public AlertSourceTypeController(AppDbContext context, ILogger<AlertSourceTypeController> logger)
        {
            this._context = context;
            this._logger = logger;
        }
        [HttpGet]
        public IEnumerable<AlertSourceType> Get()
        {
            var ret = _context.AlertSourceType.ToList();
            return ret;
        }

        [HttpGet("{id}", Name = "GetAlertSourceType")]
        public AlertSourceType Get(int id)
        {
            var ret = _context.AlertSourceType.FirstOrDefault(x => x.AlertSourceTypeID == id);
            return ret;
        }

        [HttpPost]
        public IActionResult Create([FromBody] AlertSourceType newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.AlertSourceType.Add(newmodel);
                _context.SaveChanges();

                return CreatedAtRoute("GetAlertSourceType", new { id = newmodel.AlertSourceTypeID }, newmodel);
            }
            else
            { return BadRequest(); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.AlertSourceType.FirstOrDefault(t => t.AlertSourceTypeID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.AlertSourceType.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<AlertSourceType> modeltopatch)
        {
            var topatch = _context.AlertSourceType.FirstOrDefault(t => t.AlertSourceTypeID == id);
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
        public IActionResult UpdateEntry([FromBody] AlertSourceType objupd)
        {
            var targetObject = _context.AlertSourceType.FirstOrDefault(t => t.AlertSourceTypeID == objupd.AlertSourceTypeID);
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
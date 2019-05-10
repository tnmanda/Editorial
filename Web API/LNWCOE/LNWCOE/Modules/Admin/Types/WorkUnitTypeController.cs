using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LNWCOE.Data;
using LNWCOE.Models.Admin;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.Extensions.Logging;

namespace LNWCOE.Helpers.Admin.Types
{
    [Produces("application/json")]
    [Route("api/workUnitType")]
    [Authorize]
    public class WorkUnitTypeController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<WorkUnitType> _logger;

        public WorkUnitTypeController(AppDbContext context, ILogger<WorkUnitType> logger)
        {
            this._context = context;
            this._logger = logger;
        }
        [HttpGet]
        public IEnumerable<WorkUnitType> Get()
        { return _context.WorkUnitType.ToList(); }

        [HttpGet("{id}", Name = "GetWorkUnitType")]
        public WorkUnitType Get(int id)
        { return _context.WorkUnitType.FirstOrDefault(x => x.WorkUnitTypeID == id); }

        [HttpPost]
        public IActionResult Create([FromBody] WorkUnitType newmodel)
        {
            if (ModelState.IsValid)
            {
                _context.WorkUnitType.Add(newmodel);
                _context.SaveChanges();
                return CreatedAtRoute("GetWorkUnitType", new { id = newmodel.WorkUnitTypeID }, newmodel);
            }
            else
            { return BadRequest(); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.WorkUnitType.FirstOrDefault(t => t.WorkUnitTypeID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.WorkUnitType.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<WorkUnitType> modeltopatch)
        {
            var topatch = _context.WorkUnitType.FirstOrDefault(t => t.WorkUnitTypeID == id);
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
        public IActionResult UpdateEntry([FromBody] WorkUnitType objupd)
        {
            var targetObject = _context.WorkUnitType.FirstOrDefault(t => t.WorkUnitTypeID == objupd.WorkUnitTypeID);
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
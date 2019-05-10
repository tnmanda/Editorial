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
    [Route("api/AssignmentType")]
    [Authorize]
    public class AssignmentTypeController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<AssignmentType> _logger;

        public AssignmentTypeController(AppDbContext context, ILogger<AssignmentType> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<AssignmentType> Get()
        { return _context.AssignmentType.ToList(); }

        [HttpGet("{id}", Name = "GetAssignmentType")]
        public AssignmentType Get(int id)
        { return _context.AssignmentType.FirstOrDefault(x => x.AssignmentTypeID == id); }

        [HttpPost]
        public IActionResult Create([FromBody] AssignmentType newmodel)
        {
            if (ModelState.IsValid)
            {
                _context.AssignmentType.Add(newmodel);
                _context.SaveChanges();
                return CreatedAtRoute("GetAssignmentType", new { id = newmodel.AssignmentTypeID }, newmodel);
            }
            else
            { return BadRequest(); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.AssignmentType.FirstOrDefault(t => t.AssignmentTypeID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.AssignmentType.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<AssignmentType> modeltopatch)
        {
            var topatch = _context.AssignmentType.FirstOrDefault(t => t.AssignmentTypeID == id);
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
        public IActionResult UpdateEntry([FromBody] AssignmentType objupd)
        {
            var targetObject = _context.AssignmentType.FirstOrDefault(t => t.AssignmentTypeID == objupd.AssignmentTypeID);
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
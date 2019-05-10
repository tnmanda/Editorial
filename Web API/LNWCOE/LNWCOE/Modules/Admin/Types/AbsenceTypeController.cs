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
    [Route("api/AbsenceType")]
    [Authorize]
    public class AbsenceTypeController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<AbsenceType> _logger;

        public AbsenceTypeController(AppDbContext context, ILogger<AbsenceType> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<AbsenceType> Get()
        { return _context.AbsenceType.ToList(); }

        [HttpGet("{id}", Name = "GetAbsenceType")]
        public AbsenceType Get(int id)
        { return _context.AbsenceType.FirstOrDefault(x => x.AbsenceTypeID == id); }

        [HttpPost]
        public IActionResult Create([FromBody] AbsenceType newmodel)
        {
            if (ModelState.IsValid)
            {
                _context.AbsenceType.Add(newmodel);
                _context.SaveChanges();
                return CreatedAtRoute("GetAbsenceType", new { id = newmodel.AbsenceTypeID }, newmodel);
            }
            else
            { return BadRequest(); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.AbsenceType.FirstOrDefault(t => t.AbsenceTypeID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.AbsenceType.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<AbsenceType> modeltopatch)
        {
            var topatch = _context.AbsenceType.FirstOrDefault(t => t.AbsenceTypeID == id);
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
        public IActionResult UpdateEntry([FromBody] AbsenceType objupd)
        {
            var targetObject = _context.AbsenceType.FirstOrDefault(t => t.AbsenceTypeID == objupd.AbsenceTypeID);
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
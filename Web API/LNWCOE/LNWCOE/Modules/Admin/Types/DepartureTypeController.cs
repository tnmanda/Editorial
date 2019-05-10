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
    [Route("api/DepartureType")]
    [Authorize]
    public class DepartureTypeController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<DepartureType> _logger;

        public DepartureTypeController(AppDbContext context, ILogger<DepartureType> logger)
        {
            this._context = context;
            this._logger = logger;
        }
        [HttpGet]
        public IEnumerable<DepartureType> Get()
        { return _context.DepartureType.ToList(); }

        [HttpGet("{id}", Name = "GetDepartureType")]
        public DepartureType Get(int id)
        { return _context.DepartureType.FirstOrDefault(x => x.DepartureTypeID == id); }

        [HttpPost]
        public IActionResult Create([FromBody] DepartureType newmodel)
        {
            if (ModelState.IsValid)
            {
                _context.DepartureType.Add(newmodel);
                _context.SaveChanges();
                return CreatedAtRoute("GetDepartureType", new { id = newmodel.DepartureTypeID }, newmodel);
            }
            else
            { return BadRequest(); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.DepartureType.FirstOrDefault(t => t.DepartureTypeID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.DepartureType.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<DepartureType> modeltopatch)
        {
            var topatch = _context.DepartureType.FirstOrDefault(t => t.DepartureTypeID == id);
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
        public IActionResult UpdateEntry([FromBody] DepartureType objupd)
        {
            var targetObject = _context.DepartureType.FirstOrDefault(t => t.DepartureTypeID == objupd.DepartureTypeID);
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
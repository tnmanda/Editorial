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
    [Route("api/ProficiencyType")]
    [Authorize]
    public class ProficiencyTypeController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<ProficiencyType> _logger;

        public ProficiencyTypeController(AppDbContext context, ILogger<ProficiencyType> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<ProficiencyType> Get()
        { return _context.ProficiencyType.ToList(); }

        [HttpGet("{id}", Name = "GetProficiencyType")]
        public ProficiencyType Get(int id)
        { return _context.ProficiencyType.FirstOrDefault(x => x.ProficiencyTypeID == id); }

        [HttpPost]
        public IActionResult Create([FromBody] ProficiencyType newmodel)
        {
            if (ModelState.IsValid)
            {
                _context.ProficiencyType.Add(newmodel);
                _context.SaveChanges();
                return CreatedAtRoute("GetProficiencyType", new { id = newmodel.ProficiencyTypeID }, newmodel);
            }
            else
            { return BadRequest(); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.ProficiencyType.FirstOrDefault(t => t.ProficiencyTypeID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.ProficiencyType.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<ProficiencyType> modeltopatch)
        {
            var topatch = _context.ProficiencyType.FirstOrDefault(t => t.ProficiencyTypeID == id);
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
        public IActionResult UpdateEntry([FromBody] ProficiencyType objupd)
        {
            var targetObject = _context.ProficiencyType.FirstOrDefault(t => t.ProficiencyTypeID == objupd.ProficiencyTypeID);
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
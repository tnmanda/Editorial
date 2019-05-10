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
    [Route("api/LanguageType")]
    [Authorize]
    public class LanguageTypeController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<LanguageType> _logger;

        public LanguageTypeController(AppDbContext context, ILogger<LanguageType> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<LanguageType> Get()
        { return _context.LanguageType.ToList(); }

        [HttpGet("{id}", Name = "GetLanguageType")]
        public LanguageType Get(int id)
        { return _context.LanguageType.FirstOrDefault(x => x.LanguageTypeID == id); }

        [HttpPost]
        public IActionResult Create([FromBody] LanguageType newmodel)
        {
            if (ModelState.IsValid)
            {
                _context.LanguageType.Add(newmodel);
                _context.SaveChanges();
                return CreatedAtRoute("GetLanguageType", new { id = newmodel.LanguageTypeID }, newmodel);
            }
            else
            { return BadRequest(); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.LanguageType.FirstOrDefault(t => t.LanguageTypeID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.LanguageType.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<LanguageType> modeltopatch)
        {
            var topatch = _context.LanguageType.FirstOrDefault(t => t.LanguageTypeID == id);
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
        public IActionResult UpdateEntry([FromBody] LanguageType objupd)
        {
            var targetObject = _context.LanguageType.FirstOrDefault(t => t.LanguageTypeID == objupd.LanguageTypeID);
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
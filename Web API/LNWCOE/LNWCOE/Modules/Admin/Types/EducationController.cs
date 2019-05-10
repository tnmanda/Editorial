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
    [Route("api/education")]
    [Authorize]
    public class EducationController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<EducationType> _logger;

        public EducationController(AppDbContext context, ILogger<EducationType> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<EducationType> Get()
        {
            var ret = _context.EducationType.ToList();
            return ret;
        }

        [HttpGet("{id}", Name = "GetEducation")]
        public EducationType Get(int id)
        {
            var ret = _context.EducationType.FirstOrDefault(x => x.EducationTypeID == id);
            return ret;
        }

        [HttpPost]
        public IActionResult Create([FromBody] EducationType newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.EducationType.Add(newmodel);
                _context.SaveChanges();

                return CreatedAtRoute("GetEducation", new { id = newmodel.EducationTypeID }, newmodel);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.EducationType.FirstOrDefault(t => t.EducationTypeID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.EducationType.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<EducationType> modeltopatch)
        {
            var topatch = _context.EducationType.FirstOrDefault(t => t.EducationTypeID == id);
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
        public IActionResult UpdateEntry([FromBody] EducationType objupd)
        {
            var targetObject = _context.EducationType.FirstOrDefault(t => t.EducationTypeID == objupd.EducationTypeID);
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
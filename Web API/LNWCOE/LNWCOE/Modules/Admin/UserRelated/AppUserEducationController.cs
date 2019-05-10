using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LNWCOE.Data;
using LNWCOE.Models.Admin;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace LNWCOE.Helpers.Admin
{
    [Produces("application/json")]
    [Route("api/AppUserEducation")]
    [Authorize]
    public class AppUserEducationController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<AppUserEducationController> _logger;

        public AppUserEducationController(AppDbContext context, ILogger<AppUserEducationController> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<AppUserEducation> Get()
        {
            var ret = _context.AppUserEducation.ToList();
            return ret;
        }

        [HttpGet("{id}", Name = "GetAppUserEducation")]
        public AppUserEducation Get(int id)
        {
            /*
            var ret = _context.AppUserEducation.FirstOrDefault(x => x.AppUserEducationID == id);
            return ret;
            */
            var ret = _context.AppUserEducation
              .Where(x => x.AppUserEducationID == id)
              .Include("EducationType");

            return ret.FirstOrDefault();
        }

        [HttpGet("user/{id}")]
        public IQueryable<AppUserEducation> GetByUser(int id)
        {
            /*
            var ret = _context.AppUserEducation.Where(x => x.AppUserID == id).ToList();
            return ret;
            */
            var ret = _context.AppUserEducation
              .Where(x => x.AppUserID == id)
              .Include("EducationType");

            return ret;
        }

        [HttpPost]
        public IActionResult Create([FromBody] AppUserEducation newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.AppUserEducation.Add(newmodel);
                _context.SaveChanges();

                return CreatedAtRoute("GetAppUserEducation", new { id = newmodel.AppUserEducationID }, newmodel);
            }
            else
            { return BadRequest(); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.AppUserEducation.FirstOrDefault(t => t.AppUserEducationID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.AppUserEducation.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<AppUserEducation> modeltopatch)
        {
            var topatch = _context.AppUserEducation.FirstOrDefault(t => t.AppUserEducationID == id);
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
        public IActionResult UpdateEntry([FromBody] AppUserEducation objupd)
        {
            var targetObject = _context.AppUserEducation.FirstOrDefault(t => t.AppUserEducationID == objupd.AppUserEducationID);
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
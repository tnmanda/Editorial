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
    [Route("api/AppUserLanguage")]
    [Authorize]
    public class AppUserLanguageController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<AppUserLanguageController> _logger;

        public AppUserLanguageController(AppDbContext context, ILogger<AppUserLanguageController> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<AppUserLanguage> Get()
        {
            var ret = _context.AppUserLanguage.ToList();
            return ret;
        }

        [HttpGet("{id}", Name = "GetAppUserLanguage")]
        public AppUserLanguage Get(int id)
        {
            /*
            var ret = _context.AppUserLanguage.FirstOrDefault(x => x.AppUserLanguageID == id);
            return ret;
            */
            var ret = _context.AppUserLanguage
              .Where(x => x.AppUserLanguageID == id)
              .Include("ProficiencyType")
              .Include("LanguageType");

            return ret.FirstOrDefault();
        }

        [HttpGet("user/{id}")]
        public IQueryable<AppUserLanguage> GetByUser(int id)
        {
            /*
            var ret = _context.AppUserLanguage.Where(x => x.AppUserID == id).ToList();
            return ret;
            */
            var ret = _context.AppUserLanguage
              .Where(x => x.AppUserID == id)
              .Include("ProficiencyType")
              .Include("LanguageType");

            return ret;

        }

        [HttpPost]
        public IActionResult Create([FromBody] AppUserLanguage newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.AppUserLanguage.Add(newmodel);
                _context.SaveChanges();

                return CreatedAtRoute("GetAppUserLanguage", new { id = newmodel.AppUserLanguageID }, newmodel);
            }
            else
            { return BadRequest(); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.AppUserLanguage.FirstOrDefault(t => t.AppUserLanguageID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.AppUserLanguage.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<AppUserLanguage> modeltopatch)
        {
            var topatch = _context.AppUserLanguage.FirstOrDefault(t => t.AppUserLanguageID == id);
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
        public IActionResult UpdateEntry([FromBody] AppUserLanguage objupd)
        {
            var targetObject = _context.AppUserLanguage.FirstOrDefault(t => t.AppUserLanguageID == objupd.AppUserLanguageID);
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
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
    [Route("api/AppUserCountry")]
    [Authorize]
    public class AppUserCountryController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<AppUserCountryController> _logger;

        public AppUserCountryController(AppDbContext context, ILogger<AppUserCountryController> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<AppUserCountry> Get()
        {
            var ret = _context.AppUserCountry.ToList();
            return ret;
        }

        [HttpGet("{id}", Name = "GetAppUserCountry")]
        public AppUserCountry Get(int id)
        {
            /*
            var ret = _context.AppUserCountry.FirstOrDefault(x => x.AppUserCountryID == id);
            return ret;
            */
            var ret = _context.AppUserCountry
              .Where(x => x.AppUserCountryID == id)
              .Include("Country");

            return ret.FirstOrDefault();
        }

        [HttpGet("user/{id}")]
        public IQueryable<AppUserCountry> GetByUser(int id)
        {
            /*
            var ret = _context.AppUserCountry.Where(x => x.AppUserID == id).ToList();
            return ret;
            */
            var ret = _context.AppUserCountry
              .Where(x => x.AppUserID == id)
              .Include("Country");

            return ret;
        }

        [HttpPost]
        public IActionResult Create([FromBody] AppUserCountry newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.AppUserCountry.Add(newmodel);
                _context.SaveChanges();

                return CreatedAtRoute("GetAppUserCountry", new { id = newmodel.AppUserCountryID }, newmodel);
            }
            else
            { return BadRequest(); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.AppUserCountry.FirstOrDefault(t => t.AppUserCountryID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.AppUserCountry.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<AppUserCountry> modeltopatch)
        {
            var topatch = _context.AppUserCountry.FirstOrDefault(t => t.AppUserCountryID == id);
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
        public IActionResult UpdateEntry([FromBody] AppUserCountry objupd)
        {
            var targetObject = _context.AppUserCountry.FirstOrDefault(t => t.AppUserCountryID == objupd.AppUserCountryID);
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
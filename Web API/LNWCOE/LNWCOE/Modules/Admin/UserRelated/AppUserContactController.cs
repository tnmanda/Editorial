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
    [Route("api/AppUserContact")]
    [Authorize]
    public class AppUserContactController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<AppUserContactController> _logger;

        public AppUserContactController(AppDbContext context, ILogger<AppUserContactController> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<AppUserContact> Get()
        {
            var ret = _context.AppUserContact.ToList();
            return ret;
        }

        [HttpGet("{id}", Name = "GetAppUserContact")]
        public AppUserContact Get(int id)
        {
            /*
            var ret = _context.AppUserContact.FirstOrDefault(x => x.AppUserContactID == id);
            return ret;
            */
            var ret = _context.AppUserContact
               .Where(x => x.AppUserContactID == id)
               .Include("ContactType");

            return ret.FirstOrDefault();
        }

        [HttpGet("user/{id}")]
        public IQueryable<AppUserContact> GetByUser(int id)
        {
            /*
            var ret = _context.AppUserContact.Where(x => x.AppUserID == id).ToList();
            return ret;
            */
            var ret = _context.AppUserContact
               .Where(x => x.AppUserID == id)
               .Include("ContactType");

            return ret;
        }

        [HttpPost]
        public IActionResult Create([FromBody] AppUserContact newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.AppUserContact.Add(newmodel);
                _context.SaveChanges();

                return CreatedAtRoute("GetAppUserContact", new { id = newmodel.AppUserContactID }, newmodel);
            }
            else
            { return BadRequest(); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.AppUserContact.FirstOrDefault(t => t.AppUserContactID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.AppUserContact.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<AppUserContact> modeltopatch)
        {
            var topatch = _context.AppUserContact.FirstOrDefault(t => t.AppUserContactID == id);
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
        public IActionResult UpdateEntry([FromBody] AppUserContact objupd)
        {
            var targetObject = _context.AppUserContact.FirstOrDefault(t => t.AppUserContactID == objupd.AppUserContactID);
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
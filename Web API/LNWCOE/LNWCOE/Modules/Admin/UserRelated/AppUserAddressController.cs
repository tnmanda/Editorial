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
    [Route("api/AppUserAddress")]
    [Authorize]
    public class AppUserAddressController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<AppUserAddressController> _logger;

        public AppUserAddressController(AppDbContext context, ILogger<AppUserAddressController> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<AppUserAddress> Get()
        {
            var ret = _context.AppUserAddress.ToList();
            return ret;
        }

        [HttpGet("{id}", Name = "GetAppUserAddress")]
        public AppUserAddress Get(int id)
        {
            /*
            var ret = _context.AppUserAddress.FirstOrDefault(x => x.AppUserAddressID == id);
            return ret;
            */
            var ret = _context.AppUserAddress
               .Where(x => x.AppUserAddressID == id)
               .Include("Country")
               .Include("AddressType");

            return ret.FirstOrDefault();
        }

        [HttpGet("user/{id}")]
        public IQueryable<AppUserAddress> GetByUser(int id)
        {
            /*
            var ret = _context.AppUserAddress.Where(x => x.AppUserID == id).ToList();
            return ret;
            */
            var ret = _context.AppUserAddress
               .Where(x => x.AppUserID == id)
               .Include("Country")
               .Include("AddressType");

            return ret;
        }


        [HttpPost]
        public IActionResult Create([FromBody] AppUserAddress newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.AppUserAddress.Add(newmodel);
                _context.SaveChanges();

                return CreatedAtRoute("GetAppUserAddress", new { id = newmodel.AppUserAddressID }, newmodel);
            }
            else
            { return BadRequest(); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.AppUserAddress.FirstOrDefault(t => t.AppUserAddressID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.AppUserAddress.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<AppUserAddress> modeltopatch)
        {
            var topatch = _context.AppUserAddress.FirstOrDefault(t => t.AppUserAddressID == id);
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
        public IActionResult UpdateEntry([FromBody] AppUserAddress objupd)
        {
            var targetObject = _context.AppUserAddress.FirstOrDefault(t => t.AppUserAddressID == objupd.AppUserAddressID);
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
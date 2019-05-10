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
    [Route("api/usermap")]
    [Authorize]
    public class HrUserMapController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<HREditorialUserMap> _logger;

        public HrUserMapController(AppDbContext context, ILogger<HREditorialUserMap> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<HREditorialUserMap> Get()
        {
            var strReturn = _context.HREditorialUserMap
                .Include("AppUser")
                .ToList();
            return strReturn;
        }

        [HttpGet("{id}", Name = "GetHREditorialUserMap")]
        public HREditorialUserMap Get(int id)
        {
            var strReturn = _context.HREditorialUserMap
                .Where(x => x.HREditorialUserMapID == id)
                .Include("AppUser").FirstOrDefault();
                
            return strReturn;
        }

        [HttpPost]
        public IActionResult Create([FromBody]HREditorialUserMap newObj)
        {
            if (newObj == null)
            { return BadRequest(); }

            _context.HREditorialUserMap.Add(newObj);
            _context.SaveChanges();

            return CreatedAtRoute("GetHREditorialUserMap", new { id = newObj.HREditorialUserMapID }, newObj);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.HREditorialUserMap.FirstOrDefault(t => t.HREditorialUserMapID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.HREditorialUserMap.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<HREditorialUserMap> modeltopatch)
        {
            var topatch = _context.HREditorialUserMap.FirstOrDefault(t => t.HREditorialUserMapID == id);
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
        public IActionResult UpdateEntry([FromBody] HREditorialUserMap objupd)
        {
            var targetObject = _context.HREditorialUserMap.FirstOrDefault(t => t.HREditorialUserMapID == objupd.HREditorialUserMapID);
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
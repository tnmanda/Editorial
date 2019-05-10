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
    [Route("api/office")]
    [Authorize]
    public class OfficeController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<OfficeController> _logger;

        public OfficeController(AppDbContext context, ILogger<OfficeController> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<Office> Get()
        {
            var ret = _context.Office
                .Include("Country")
                .ToList();
            
            return ret;
        }


        [HttpGet("{id}", Name = "GetOffice")]
        public JsonResult Get(int id)
        {

            var ret = _context.Office
                .Where(x => x.OfficeID == id)
                .Include("Country");
               

            return Json(ret.FirstOrDefault());
        }

        [HttpPost]
        public IActionResult Create([FromBody] Office newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.Office.Add(newmodel);
                _context.SaveChanges();

                return CreatedAtRoute("GetOffice", new { id = newmodel.OfficeID }, newmodel);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.Office.FirstOrDefault(t => t.OfficeID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.Office.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<Office> modeltopatch)
        {
            var topatch = _context.Office.FirstOrDefault(t => t.OfficeID == id);
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
        public IActionResult UpdateEntry([FromBody] Office objupd)
        {
            var targetObject = _context.Office.FirstOrDefault(t => t.OfficeID == objupd.OfficeID);
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
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LNWCOE.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using LNWCOE.Models.Admin.Page;
using Microsoft.Extensions.Logging;

namespace LNWCOE.Helpers.Admin.Pages
{
    [Produces("application/json")]
    [Route("api/parentgroup")]
    [Authorize]
    public class ParentGroupController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<ParentGroupController> _logger;

        public ParentGroupController(AppDbContext context, ILogger<ParentGroupController> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<ParentGroup> Get()
        {
            var ret = _context.ParentGroup.ToList();
            return ret;
        }

        [HttpGet("{id}", Name = "GetParentGroup")]
        public ParentGroup Get(int id)
        {
            var ret = _context.ParentGroup.FirstOrDefault(x => x.ParentGroupID == id);
            return ret;
        }

        [HttpPost]
        public IActionResult Create([FromBody] ParentGroup newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.ParentGroup.Add(newmodel);
                _context.SaveChanges();

                return CreatedAtRoute("GetParentGroup", new { id = newmodel.ParentGroupID }, newmodel);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.ParentGroup.FirstOrDefault(t => t.ParentGroupID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.ParentGroup.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Patch(int id, [FromBody]JsonPatchDocument<ParentGroup> modeltopatch)
        {
            var topatch = _context.ParentGroup.FirstOrDefault(t => t.ParentGroupID == id);
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
        public IActionResult UpdateEntry([FromBody] ParentGroup objupd)
        {
            var targetObject = _context.ParentGroup.FirstOrDefault(t => t.ParentGroupID == objupd.ParentGroupID);
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
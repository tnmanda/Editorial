using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LNWCOE.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using LNWCOE.Models.Admin.Page;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using System;


namespace LNWCOE.Helpers.Admin.Pages
{
    [Produces("application/json")]
    [Route("api/PagesGroups")]
    [Authorize]
    public class PagesGroupsController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<PagesGroupsController> _logger;

        public PagesGroupsController(AppDbContext context, ILogger<PagesGroupsController> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<PagesGroups> Get()
        {
            var ret = _context.PagesGroups.OrderBy(x => x.SortOrder).ToList();
            return ret;
        }

        [HttpGet("{id}", Name = "GetPageGroup")]
        public PagesGroups Get(int id)
        {
            var ret = _context.PagesGroups
                .Where(x => x.PagesGroupsID == id)
                .Include("ParentGroup");

            return ret.FirstOrDefault();
        }

        [HttpPost]
        public IActionResult Create([FromBody] PagesGroups newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.PagesGroups.Add(newmodel);
                _context.SaveChanges();

                return CreatedAtRoute("GetPageGroup", new { id = newmodel.PagesGroupsID }, newmodel);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.PagesGroups.FirstOrDefault(t => t.PagesGroupsID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.PagesGroups.Remove(todelete);

            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<PagesGroups> modeltopatch)
        {
            var topatch = _context.PagesGroups.FirstOrDefault(t => t.PagesGroupsID == id);
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
        public IActionResult UpdateEntry([FromBody] PagesGroups objupd)
        {
            var targetObject = _context.PagesGroups.FirstOrDefault(t => t.PagesGroupsID == objupd.PagesGroupsID);
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
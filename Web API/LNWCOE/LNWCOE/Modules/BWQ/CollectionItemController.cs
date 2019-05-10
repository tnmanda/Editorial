using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LNWCOE.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using LNWCOE.Models.BWQ;

namespace LNWCOE.Helpers.BWQ
{
    [Produces("application/json")]
    [Route("api/bwq/CollectionItem")]
    [Authorize]
    public class CollectionItemController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<CollectionItemController> _logger;

        public CollectionItemController(AppDbContext context, ILogger<CollectionItemController> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<CollectionItem> Get()
        {
            var ret = _context.CollectionItem.ToList();

            return ret;
        }

        [HttpGet("{id}", Name = "GetCollectionItem")]
        public CollectionItem Get(int id)
        {
            var ret = _context.CollectionItem
                .Where(x => x.CollectionItemID == id)
                .Include("Collection");

            return ret.FirstOrDefault();
        }

        [HttpGet("col/{id}")]
        public IQueryable<CollectionItem> GetByColId(int id)
        {
            var ret = _context.CollectionItem
                .Include("Collection")
                .Where(x => x.CollectionID == id);

            return ret;
        }

        [HttpPost]
        public IActionResult Create([FromBody] CollectionItem newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.CollectionItem.Add(newmodel);
                _context.SaveChanges();

                return CreatedAtRoute("GetCollectionItem", new { id = newmodel.CollectionItemID }, newmodel);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.CollectionItem.FirstOrDefault(t => t.CollectionItemID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.CollectionItem.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<CollectionItem> modeltopatch)
        {
            var topatch = _context.CollectionItem.FirstOrDefault(t => t.CollectionItemID == id);
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
        public IActionResult UpdateEntry([FromBody] CollectionItem objupd)
        {
            var targetObject = _context.CollectionItem.FirstOrDefault(t => t.CollectionItemID == objupd.CollectionItemID);
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
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
    [Route("api/bwq/Collection")]
    [Authorize]
    public class CollectionController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<CollectionController> _logger;

        public CollectionController(AppDbContext context, ILogger<CollectionController> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<Collection> Get()
        {
            var ret = _context.Collection.ToList();

            return ret;
        }

        [HttpGet("{id}", Name = "GetCollection")]
        public Collection Get(int id)
        {
            var ret = _context.Collection
                .Where(x => x.CollectionID == id);

            return ret.FirstOrDefault();
        }

        [HttpPost]
        public IActionResult Create([FromBody] Collection newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.Collection.Add(newmodel);
                _context.SaveChanges();

                return CreatedAtRoute("GetCollection", new { id = newmodel.CollectionID }, newmodel);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.Collection.FirstOrDefault(t => t.CollectionID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.Collection.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<Collection> modeltopatch)
        {
            var topatch = _context.Collection.FirstOrDefault(t => t.CollectionID == id);
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
        public IActionResult UpdateEntry([FromBody] Collection objupd)
        {
            var targetObject = _context.Collection.FirstOrDefault(t => t.CollectionID == objupd.CollectionID);
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
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LNWCOE.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.Extensions.Logging;
using LNWCOE.Models.BWQ;

namespace LNWCOE.Helpers.BWQ
{
    [Produces("application/json")]
    [Route("api/bwq/BWQDispositions")]
    [Authorize]
    public class BWQDispositionsController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<BWQDispositionsController> _logger;

        public BWQDispositionsController(AppDbContext context, ILogger<BWQDispositionsController> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<BWQDispositions> Get()
        {
            var ret = _context.BWQDispositions.ToList();

            return ret;
        }

        [HttpGet("{id}", Name = "GetBWQDispositions")]
        public BWQDispositions Get(int id)
        {
            var ret = _context.BWQDispositions
                .Where(x => x.BWQDispositionsID == id);

            return ret.FirstOrDefault();
        }

        

        [HttpPost]
        public IActionResult Create([FromBody] BWQDispositions newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.BWQDispositions.Add(newmodel);
                _context.SaveChanges();

                return CreatedAtRoute("GetBWQDispositions", new { id = newmodel.BWQDispositionsID }, newmodel);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.BWQDispositions.FirstOrDefault(t => t.BWQDispositionsID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.BWQDispositions.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<BWQDispositions> modeltopatch)
        {
            var topatch = _context.BWQDispositions.FirstOrDefault(t => t.BWQDispositionsID == id);
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
        public IActionResult UpdateEntry([FromBody] BWQDispositions objupd)
        {
            var targetObject = _context.BWQDispositions.FirstOrDefault(t => t.BWQDispositionsID == objupd.BWQDispositionsID);
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
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LNWCOE.Data;
using LNWCOE.Models.Admin;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.Extensions.Logging;

namespace LNWCOE.Helpers.Admin
{
    [Produces("application/json")]
    [Route("api/Encoding")]
    [Authorize]
    public class EncodingController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<EncodingController> _logger;

        public EncodingController(AppDbContext context, ILogger<EncodingController> logger)
        {
            this._context = context;
            this._logger = logger;
        }
        [HttpGet]
        public IEnumerable<Encoding> Get()
        {
            var ret = _context.Encoding.ToList();
            return ret;
        }

        [HttpGet("{id}", Name = "GetEncoding")]
        public Encoding Get(int id)
        {
            var ret = _context.Encoding.FirstOrDefault(x => x.EncodingID == id);
            return ret;
        }

        [HttpGet("name/{name}")]
        public Encoding GetByName(string name)
        {
            var ret = _context.Encoding.FirstOrDefault(x => x.EncodingName == name);
            return ret;
        }

        [HttpPost]
        public IActionResult Create([FromBody] Encoding newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.Encoding.Add(newmodel);
                _context.SaveChanges();

                return CreatedAtRoute("GetEncoding", new { id = newmodel.EncodingID }, newmodel);
            }
            else
            { return BadRequest(); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.Encoding.FirstOrDefault(t => t.EncodingID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.Encoding.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<Encoding> modeltopatch)
        {
            var topatch = _context.Encoding.FirstOrDefault(t => t.EncodingID == id);
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
        public IActionResult UpdateEntry([FromBody] Encoding objupd)
        {
            var targetObject = _context.Encoding.FirstOrDefault(t => t.EncodingID == objupd.EncodingID);
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
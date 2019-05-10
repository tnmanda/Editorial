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
    [Route("api/bwq/BWQFieldSelect")]
    [Authorize]
    public class BWQFieldSelectController : Controller
    {

        private readonly AppDbContext _context;
        private readonly ILogger<BWQFieldSelectController> _logger;

        public BWQFieldSelectController(AppDbContext context, ILogger<BWQFieldSelectController> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<BWQFieldSelect> Get()
        {
            var ret = _context.BWQFieldSelect.ToList();

            return ret;
        }

        [HttpGet("{id}", Name = "GetBWQFieldSelect")]
        public BWQFieldSelect Get(int id)
        {
            var ret = _context.BWQFieldSelect
                .Where(x => x.BWQFieldSelectID == id);

            return ret.FirstOrDefault();
        }

        [HttpPost]
        public IActionResult Create([FromBody] BWQFieldSelect newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.BWQFieldSelect.Add(newmodel);
                _context.SaveChanges();

                return CreatedAtRoute("GetBWQFieldSelect", new { id = newmodel.BWQFieldSelectID }, newmodel);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.BWQFieldSelect.FirstOrDefault(t => t.BWQFieldSelectID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.BWQFieldSelect.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<BWQFieldSelect> modeltopatch)
        {
            var topatch = _context.BWQFieldSelect.FirstOrDefault(t => t.BWQFieldSelectID == id);
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
        public IActionResult UpdateEntry([FromBody] BWQFieldSelect objupd)
        {
            var targetObject = _context.BWQFieldSelect.FirstOrDefault(t => t.BWQFieldSelectID == objupd.BWQFieldSelectID);
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
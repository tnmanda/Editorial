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
    [Route("api/gender")]
    [Authorize]
    public class GenderController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<GenderType> _logger;

        public GenderController(AppDbContext context, ILogger<GenderType> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<GenderType> Get()
        {
            var ret = _context.GenderType.ToList();
            return ret;
        }

        [HttpGet("{id}", Name = "GetGender")]
        public GenderType Get(int id)
        {
            var ret = _context.GenderType.FirstOrDefault(x => x.GenderTypeID == id);
            return ret;
        }

        [HttpPost]
        public IActionResult Create([FromBody] GenderType newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.GenderType.Add(newmodel);
                _context.SaveChanges();

                return CreatedAtRoute("GetGender", new { id = newmodel.GenderTypeID }, newmodel);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.GenderType.FirstOrDefault(t => t.GenderTypeID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.GenderType.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<GenderType> modeltopatch)
        {
            var topatch = _context.GenderType.FirstOrDefault(t => t.GenderTypeID == id);
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
        public IActionResult UpdateEntry([FromBody] GenderType objupd)
        {
            var targetObject = _context.GenderType.FirstOrDefault(t => t.GenderTypeID == objupd.GenderTypeID);
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
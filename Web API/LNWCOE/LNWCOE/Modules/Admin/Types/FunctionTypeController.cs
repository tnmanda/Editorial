using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LNWCOE.Data;
using LNWCOE.Models.Admin;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.Extensions.Logging;

namespace LNWCOE.Helpers.Admin.Types
{
    [Produces("application/json")]
    [Route("api/FunctionType")]
    [Authorize]
    public class FunctionTypeController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<FunctionType> _logger;

        public FunctionTypeController(AppDbContext context, ILogger<FunctionType> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<FunctionType> Get()
        { return _context.FunctionType.ToList(); }

        [HttpGet("{id}", Name = "GetFunctionType")]
        public FunctionType Get(int id)
        { return _context.FunctionType.FirstOrDefault(x => x.FunctionTypeID == id); }

        [HttpPost]
        public IActionResult Create([FromBody] FunctionType newmodel)
        {
            if (ModelState.IsValid)
            {
                _context.FunctionType.Add(newmodel);
                _context.SaveChanges();
                return CreatedAtRoute("GetFunctionType", new { id = newmodel.FunctionTypeID }, newmodel);
            }
            else
            { return BadRequest(); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.FunctionType.FirstOrDefault(t => t.FunctionTypeID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.FunctionType.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<FunctionType> modeltopatch)
        {
            var topatch = _context.FunctionType.FirstOrDefault(t => t.FunctionTypeID == id);
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
        public IActionResult UpdateEntry([FromBody] FunctionType objupd)
        {
            var targetObject = _context.FunctionType.FirstOrDefault(t => t.FunctionTypeID == objupd.FunctionTypeID);
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
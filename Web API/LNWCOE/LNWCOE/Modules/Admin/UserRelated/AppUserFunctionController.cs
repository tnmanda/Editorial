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
    [Route("api/AppUserFunction")]
    [Authorize]
    public class AppUserFunctionController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<AppUserFunctionController> _logger;

        public AppUserFunctionController(AppDbContext context, ILogger<AppUserFunctionController> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<AppUserFunction> Get()
        {
            var ret = _context.AppUserFunction.ToList();
            return ret;
        }

        [HttpGet("{id}", Name = "GetAppUserFunction")]
        public AppUserFunction Get(int id)
        {
            /*
            var ret = _context.AppUserFunction.FirstOrDefault(x => x.AppUserFunctionID == id);
            return ret;
            */
            var ret = _context.AppUserFunction
              .Where(x => x.AppUserFunctionID == id)
              .Include("FunctionType");

            return ret.FirstOrDefault();
        }

        [HttpGet("user/{id}")]
        public IQueryable<AppUserFunction> GetByUser(int id)
        {
            /*
            var ret = _context.AppUserFunction.Where(x => x.AppUserID == id).ToList();
            return ret;
            */
            var ret = _context.AppUserFunction
              .Where(x => x.AppUserID == id)
              .Include("FunctionType");

            return ret;
        }

        [HttpPost]
        public IActionResult Create([FromBody] AppUserFunction newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.AppUserFunction.Add(newmodel);
                _context.SaveChanges();

                return CreatedAtRoute("GetAppUserFunction", new { id = newmodel.AppUserFunctionID }, newmodel);
            }
            else
            { return BadRequest(); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.AppUserFunction.FirstOrDefault(t => t.AppUserFunctionID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.AppUserFunction.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<AppUserFunction> modeltopatch)
        {
            var topatch = _context.AppUserFunction.FirstOrDefault(t => t.AppUserFunctionID == id);
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
        public IActionResult UpdateEntry([FromBody] AppUserFunction objupd)
        {
            var targetObject = _context.AppUserFunction.FirstOrDefault(t => t.AppUserFunctionID == objupd.AppUserFunctionID);
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
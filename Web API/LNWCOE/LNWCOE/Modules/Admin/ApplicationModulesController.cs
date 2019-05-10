using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LNWCOE.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using LNWCOE.Models.Admin;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using LNWCOE.Helpers;

namespace LNWCOE.Modules.Admin
{
    [Produces("application/json")]
    [Route("api/ApplicationModules")]
    [Authorize]
    public class ApplicationModulesController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<ApplicationModulesController> _logger;

        public ApplicationModulesController(AppDbContext context, ILogger<ApplicationModulesController> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<ApplicationModules> Get()
        {
            var ret = _context.ApplicationModules.ToList();
            return ret;
        }
        [HttpGet("{id}", Name = "GetAppModule")]
        public ApplicationModules Get(int id)
        {
            var ret = _context.ApplicationModules
                .Where(x => x.ApplicationModulesID == id).FirstOrDefault();

            return ret;
        }

        [HttpPost]
        public IActionResult Create([FromBody] ApplicationModules newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.ApplicationModules.Add(newmodel);
                ReturnData ret;

                ret = _context.SaveData();

                if (ret.Message == "Success")
                {
                    return CreatedAtRoute("GetAppModule", new { id = newmodel.ApplicationModulesID }, newmodel);
                }
                else
                {
                    return BadRequest(ret);
                }
            }
            return BadRequest();
          
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.ApplicationModules.FirstOrDefault(t => t.ApplicationModulesID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.ApplicationModules.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<ApplicationModules> modeltopatch)
        {
            var topatch = _context.ApplicationModules.FirstOrDefault(t => t.ApplicationModulesID == id);
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
        public IActionResult UpdateEntry([FromBody] ApplicationModules objWithUpdates)
        {
            var targetObject = _context
                .ApplicationModules
                .FirstOrDefault(t => t.ApplicationModulesID == objWithUpdates.ApplicationModulesID);
            if (targetObject == null)
            { return NotFound(); }

            _context.Entry(targetObject).CurrentValues.SetValues(objWithUpdates);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }


    }
}
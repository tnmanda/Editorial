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
    [Route("api/operationalrole")]
    [Authorize]
    public class OperationalRoleController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<OperationalRoleController> _logger;

       public OperationalRoleController(AppDbContext context, ILogger<OperationalRoleController> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<OperationalRoleType> Get()
        {
            var ret = _context.OperationalRoleType.ToList();
            return ret;
        }

        [HttpGet("{id}", Name = "GetOperationalRole")]
        public OperationalRoleType Get(int id)
        {
            var ret = _context.OperationalRoleType.FirstOrDefault(x => x.OperationalRoleTypeID == id);
            return ret;
        }

        [HttpPost]
        public IActionResult Create([FromBody] OperationalRoleType newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.OperationalRoleType.Add(newmodel);
                _context.SaveChanges();

                return CreatedAtRoute("GetOperationalRole", new { id = newmodel.OperationalRoleTypeID }, newmodel);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.OperationalRoleType.FirstOrDefault(t => t.OperationalRoleTypeID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.OperationalRoleType.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<OperationalRoleType> modeltopatch)
        {
            var topatch = _context.OperationalRoleType.FirstOrDefault(t => t.OperationalRoleTypeID == id);
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
        public IActionResult UpdateEntry([FromBody] OperationalRoleType objupd)
        {
            var targetObject = _context.OperationalRoleType.FirstOrDefault(t => t.OperationalRoleTypeID == objupd.OperationalRoleTypeID);
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
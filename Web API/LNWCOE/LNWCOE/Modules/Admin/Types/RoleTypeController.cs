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
    [Route("api/RoleType")]
    [Authorize]
    public class RoleTypeController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<RoleType> _logger;

        public RoleTypeController(AppDbContext context, ILogger<RoleType> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<RoleType> Get()
        { return _context.RoleType.ToList(); }

        [HttpGet("{id}", Name = "GetRoleType")]
        public RoleType Get(int id)
        { return _context.RoleType.FirstOrDefault(x => x.RoleTypeID == id); }

        [HttpPost]
        public IActionResult Create([FromBody] RoleType newmodel)
        {
            if (ModelState.IsValid)
            {
                _context.RoleType.Add(newmodel);
                _context.SaveChanges();
                return CreatedAtRoute("GetRoleType", new { id = newmodel.RoleTypeID }, newmodel);
            }
            else
            { return BadRequest(); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.RoleType.FirstOrDefault(t => t.RoleTypeID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.RoleType.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<RoleType> modeltopatch)
        {
            var topatch = _context.RoleType.FirstOrDefault(t => t.RoleTypeID == id);
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
        public IActionResult UpdateEntry([FromBody] RoleType objupd)
        {
            var targetObject = _context.RoleType.FirstOrDefault(t => t.RoleTypeID == objupd.RoleTypeID);
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
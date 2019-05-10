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
    [Route("api/ContactType")]
    [Authorize]
    public class ContactTypeController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<ContactType> _logger;

        public ContactTypeController(AppDbContext context, ILogger<ContactType> logger)
        {
            this._context = context;
            this._logger = logger;
        }
        [HttpGet]
        public IEnumerable<ContactType> Get()
        { return _context.ContactType.ToList(); }

        [HttpGet("{id}", Name = "GetContactType")]
        public ContactType Get(int id)
        { return _context.ContactType.FirstOrDefault(x => x.ContactTypeID == id); }

        [HttpPost]
        public IActionResult Create([FromBody] ContactType newmodel)
        {
            if (ModelState.IsValid)
            {
                _context.ContactType.Add(newmodel);
                _context.SaveChanges();
                return CreatedAtRoute("GetContactType", new { id = newmodel.ContactTypeID }, newmodel);
            }
            else
            { return BadRequest(); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.ContactType.FirstOrDefault(t => t.ContactTypeID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.ContactType.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<ContactType> modeltopatch)
        {
            var topatch = _context.ContactType.FirstOrDefault(t => t.ContactTypeID == id);
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
        public IActionResult UpdateEntry([FromBody] ContactType objupd)
        {
            var targetObject = _context.ContactType.FirstOrDefault(t => t.ContactTypeID == objupd.ContactTypeID);
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
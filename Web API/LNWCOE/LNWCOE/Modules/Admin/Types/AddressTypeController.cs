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
    [Route("api/AddressType")]
    [Authorize]
    public class AddressTypeController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<AddressType> _logger;

        public AddressTypeController(AppDbContext context, ILogger<AddressType> logger)
        {
            this._context = context;
            this._logger = logger;
        }
        [HttpGet]
        public IEnumerable<AddressType> Get()
        { return _context.AddressType.ToList(); }

        [HttpGet("{id}", Name = "GetAddressType")]
        public AddressType Get(int id)
        { return _context.AddressType.FirstOrDefault(x => x.AddressTypeID == id); }

        [HttpPost]
        public IActionResult Create([FromBody] AddressType newmodel)
        {
            if (ModelState.IsValid)
            {
                _context.AddressType.Add(newmodel);
                _context.SaveChanges();
                return CreatedAtRoute("GetAddressType", new { id = newmodel.AddressTypeID }, newmodel);
            }
            else
            { return BadRequest(); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.AddressType.FirstOrDefault(t => t.AddressTypeID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.AddressType.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<AddressType> modeltopatch)
        {
            var topatch = _context.AddressType.FirstOrDefault(t => t.AddressTypeID == id);
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
        public IActionResult UpdateEntry([FromBody] AddressType objupd)
        {
            var targetObject = _context.AddressType.FirstOrDefault(t => t.AddressTypeID == objupd.AddressTypeID);
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
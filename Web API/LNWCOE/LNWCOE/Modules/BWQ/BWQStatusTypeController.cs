using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LNWCOE.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.Extensions.Logging;
using LNWCOE.Models.BWQ;

namespace LNWCOE.Helpers.BWQ
{
    [Produces("application/json")]
    [Route("api/bwq/BWQStatusType")]
    [Authorize]
    public class BWQStatusTypeController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<BWQStatusTypeController> _logger;

        public BWQStatusTypeController(AppDbContext context, ILogger<BWQStatusTypeController> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<BWQStatusType> Get()
        {
            var ret = _context.BWQStatusType.ToList();

            return ret;
        }

        [HttpGet("{id}", Name = "GetBWQStatusType")]
        public BWQStatusType Get(int id)
        {
            var ret = _context.BWQStatusType
                .Where(x => x.BWQStatusTypeID == id);

            return ret.FirstOrDefault();
        }

        [HttpPost]
        public IActionResult Create([FromBody] BWQStatusType newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.BWQStatusType.Add(newmodel);
                _context.SaveChanges();

                return CreatedAtRoute("GetBWQStatusType", new { id = newmodel.BWQStatusTypeID }, newmodel);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.BWQStatusType.FirstOrDefault(t => t.BWQStatusTypeID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.BWQStatusType.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<BWQStatusType> modeltopatch)
        {
            var topatch = _context.BWQStatusType.FirstOrDefault(t => t.BWQStatusTypeID == id);
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
        public IActionResult UpdateEntry([FromBody] BWQStatusType objupd)
        {
            var targetObject = _context.BWQStatusType.FirstOrDefault(t => t.BWQStatusTypeID == objupd.BWQStatusTypeID);
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
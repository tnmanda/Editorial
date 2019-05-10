using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LNWCOE.Data;
using Microsoft.AspNetCore.Authorization;
using LNWCOE.Models.INV;
using LNWCOE.Helpers;
using Microsoft.AspNetCore.JsonPatch;

//use

namespace LNWCOE.Modules.INV
{
    [Produces("application/json")]
    [Route("api/ActivityType")]
    [Authorize]
    public class ActivityTypeController : Controller
    {
        private readonly AppDbContext _context;

        public ActivityTypeController(AppDbContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public List<ActivityType> Get()
        {
            var ret = _context.ActivityType.ToList();
            return ret;
        }

        [HttpGet("{id}", Name = "GetInvestigationActivityType")]
        public ActivityType Get(int id)
        {
            var ret = _context.ActivityType
                .Where(x => x.ActivityTypeID == id);

            return ret.FirstOrDefault();
        }

        [HttpPost]
        public IActionResult Create([FromBody] ActivityType newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.ActivityType.Add(newmodel);
                ReturnData ret;
                ret = _context.SaveData();

                if (ret.Message == "Success")
                {
                    return CreatedAtRoute("GetInvestigationActivityType", new { id = newmodel.ActivityTypeID }, newmodel);
                }

                return NotFound(ret);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.ActivityType.FirstOrDefault(t => t.ActivityTypeID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.ActivityType.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<ActivityType> modeltopatch)
        {
            var topatch = _context.ActivityType.FirstOrDefault(t => t.ActivityTypeID == id);
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
        public IActionResult UpdateEntry([FromBody] ActivityType objupd)
        {
            var targetObject = _context.ActivityType.FirstOrDefault(t => t.ActivityTypeID == objupd.ActivityTypeID);
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
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LNWCOE.Data;
using Microsoft.AspNetCore.Authorization;
using LNWCOE.Models.INV;
using LNWCOE.Helpers;
using Microsoft.AspNetCore.JsonPatch;
using Newtonsoft.Json;


// use

namespace LNWCOE.Modules.INV
{
    [Produces("application/json")]
    [Route("api/PriorityType")]
    [Authorize]
    public class PriorityTypeController : Controller
    {
        private readonly AppDbContext _context;

        public PriorityTypeController(AppDbContext context)
        {
            this._context = context;
        }

        [HttpGet]
        //public IEnumerable<PriorityType> Get()
        public JsonResult Get()
        {
            var ret = _context.PriorityType.ToList();

            var result = Json(ret);

            return result;

            //return ret;
        }

        [HttpGet("{id}", Name = "GetInvestigationPriorityType")]
        public PriorityType Get(int id)
        {
            var ret = _context.PriorityType
                .Where(x => x.PriorityTypeID == id);

            return ret.FirstOrDefault();
        }

        [HttpPost]
        public IActionResult Create([FromBody] PriorityType newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.PriorityType.Add(newmodel);
                ReturnData ret;
                ret = _context.SaveData();

                if (ret.Message == "Success")
                {
                    return CreatedAtRoute("GetInvestigationPriorityType", new { id = newmodel.PriorityTypeID }, newmodel);
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
            var todelete = _context.PriorityType.FirstOrDefault(t => t.PriorityTypeID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.PriorityType.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<PriorityType> modeltopatch)
        {
            var topatch = _context.PriorityType.FirstOrDefault(t => t.PriorityTypeID == id);
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
        public IActionResult UpdateEntry([FromBody] PriorityType objupd)
        {
            var targetObject = _context.PriorityType.FirstOrDefault(t => t.PriorityTypeID == objupd.PriorityTypeID);
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
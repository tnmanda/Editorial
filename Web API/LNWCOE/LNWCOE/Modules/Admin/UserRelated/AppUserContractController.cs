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
    [Route("api/AppUserContract")]
    [Authorize]
    public class AppUserContractController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<AppUserContractController> _logger;

        public AppUserContractController(AppDbContext context, ILogger<AppUserContractController> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<AppUserContract> Get()
        {
            var ret = _context.AppUserContract.ToList();
            return ret;
        }

        [HttpGet("{id}", Name = "GetAppUserContract")]
        public AppUserContract Get(int id)
        {
            /*
            var ret = _context.AppUserContract.FirstOrDefault(x => x.AppUserContractID == id);
            return ret;
            */
            var ret = _context.AppUserContract
              .Where(x => x.AppUserContractID == id)
              .Include("ContractType");

            return ret.FirstOrDefault();
        }

        [HttpGet("user/{id}")]
        public IQueryable<AppUserContract> GetByUser(int id)
        {
            /*
            var ret = _context.AppUserContract.Where(x => x.AppUserID == id).ToList();
            return ret;
            */
            var ret = _context.AppUserContract
             .Where(x => x.AppUserID == id)
             .Include("ContractType");

            return ret;

        }

        [HttpPost]
        public IActionResult Create([FromBody] AppUserContract newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.AppUserContract.Add(newmodel);
                _context.SaveChanges();

                return CreatedAtRoute("GetAppUserContract", new { id = newmodel.AppUserContractID }, newmodel);
            }
            else
            { return BadRequest(); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.AppUserContract.FirstOrDefault(t => t.AppUserContractID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.AppUserContract.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<AppUserContract> modeltopatch)
        {
            var topatch = _context.AppUserContract.FirstOrDefault(t => t.AppUserContractID == id);
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
        public IActionResult UpdateEntry([FromBody] AppUserContract objupd)
        {
            var targetObject = _context.AppUserContract.FirstOrDefault(t => t.AppUserContractID == objupd.AppUserContractID);
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
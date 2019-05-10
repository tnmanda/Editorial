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
    [Route("api/ContractType")]
    [Authorize]
    public class ContractTypeController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<ContractType> _logger;

        public ContractTypeController(AppDbContext context, ILogger<ContractType> logger)
        {
            this._context = context;
            this._logger = logger;
        }
        [HttpGet]
        public IEnumerable<ContractType> Get()
        { return _context.ContractType.ToList(); }

        [HttpGet("{id}", Name = "GetContractType")]
        public ContractType Get(int id)
        { return _context.ContractType.FirstOrDefault(x => x.ContractTypeID == id); }

        [HttpPost]
        public IActionResult Create([FromBody] ContractType newmodel)
        {
            if (ModelState.IsValid)
            {
                _context.ContractType.Add(newmodel);
                _context.SaveChanges();
                return CreatedAtRoute("GetContractType", new { id = newmodel.ContractTypeID }, newmodel);
            }
            else
            { return BadRequest(); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.ContractType.FirstOrDefault(t => t.ContractTypeID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.ContractType.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<ContractType> modeltopatch)
        {
            var topatch = _context.ContractType.FirstOrDefault(t => t.ContractTypeID == id);
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
        public IActionResult UpdateEntry([FromBody] ContractType objupd)
        {
            var targetObject = _context.ContractType.FirstOrDefault(t => t.ContractTypeID == objupd.ContractTypeID);
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
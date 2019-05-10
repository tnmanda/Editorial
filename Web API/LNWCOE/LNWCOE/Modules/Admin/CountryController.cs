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
    [Route("api/country")]
    [Authorize]
    public class CountryController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<CountryController> _logger;

        public CountryController(AppDbContext context, ILogger<CountryController> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<Country> Get()
        {
            var ret = _context.Country.ToList();
            return ret;
        }

        [HttpGet("{id}", Name = "GetCountry")]
        public Country Get(int id)
        {
            var ret = _context.Country.FirstOrDefault(x => x.CountryID == id);
            return ret;
        }

        [HttpPost]
        public IActionResult Create([FromBody] Country newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.Country.Add(newmodel);
                _context.SaveChanges();

                return CreatedAtRoute("GetCountry", new { id = newmodel.CountryID }, newmodel);
            }
            else
            { return BadRequest(); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.Country.FirstOrDefault(t => t.CountryID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.Country.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<Country> modeltopatch)
        {
            var topatch = _context.Country.FirstOrDefault(t => t.CountryID == id);
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
        public IActionResult UpdateEntry([FromBody] Country objupd)
        {
            var targetObject = _context.Country.FirstOrDefault(t => t.CountryID == objupd.CountryID);
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
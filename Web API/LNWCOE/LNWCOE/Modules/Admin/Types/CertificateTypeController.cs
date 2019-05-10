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
    [Route("api/CertificateType")]
    [Authorize]
    public class CertificateTypeController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<CertificateType> _logger;

        public CertificateTypeController(AppDbContext context, ILogger<CertificateType> logger)
        {
            this._context = context;
            this._logger = logger;
        }
        [HttpGet]
        public IEnumerable<CertificateType> Get()
        { return _context.CertificateType.ToList(); }

        [HttpGet("{id}", Name = "GetCertType")]
        public CertificateType Get(int id)
        { return _context.CertificateType.FirstOrDefault(x => x.CertificateTypeID == id); }

        [HttpPost]
        public IActionResult Create([FromBody] CertificateType newmodel)
        {
            if (ModelState.IsValid)
            {
                _context.CertificateType.Add(newmodel);
                _context.SaveChanges();
                return CreatedAtRoute("GetCertType", new { id = newmodel.CertificateTypeID }, newmodel);
            }
            else
            { return BadRequest(); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.CertificateType.FirstOrDefault(t => t.CertificateTypeID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.CertificateType.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<CertificateType> modeltopatch)
        {
            var topatch = _context.CertificateType.FirstOrDefault(t => t.CertificateTypeID == id);
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
        public IActionResult UpdateEntry([FromBody] CertificateType objupd)
        {
            var targetObject = _context.CertificateType.FirstOrDefault(t => t.CertificateTypeID == objupd.CertificateTypeID);
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
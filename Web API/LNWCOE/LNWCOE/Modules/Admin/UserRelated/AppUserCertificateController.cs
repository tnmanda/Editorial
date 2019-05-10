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
    [Route("api/AppUserCertificate")]
    [Authorize]
    public class AppUserCertificateController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<AppUserCertificateController> _logger;

        public AppUserCertificateController(AppDbContext context, ILogger<AppUserCertificateController> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<AppUserCertificate> Get()
        {
            var ret = _context.AppUserCertificate.ToList();
            return ret;
        }

        [HttpGet("{id}", Name = "GetAppUserCertificate")]
        public AppUserCertificate Get(int id)
        {
            /*
            var ret = _context.AppUserCertificate.FirstOrDefault(x => x.AppUserCertificateID == id);
            return ret;
            */
            var ret = _context.AppUserCertificate
               .Where(x => x.AppUserCertificateID == id)
               .Include("CertificateType");

            return ret.FirstOrDefault();
        }

        [HttpGet("user/{id}")]
        public IQueryable<AppUserCertificate> GetByUser(int id)
        {
            /*
            var ret = _context.AppUserCertificate.Where(x => x.AppUserID == id).ToList();
            return ret;
            */
            var ret = _context.AppUserCertificate
               .Where(x => x.AppUserID == id)
               .Include("CertificateType");

            return ret;
        }



        [HttpPost]
        public IActionResult Create([FromBody] AppUserCertificate newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.AppUserCertificate.Add(newmodel);
                _context.SaveChanges();

                return CreatedAtRoute("GetAppUserCertificate", new { id = newmodel.AppUserCertificateID }, newmodel);
            }
            else
            { return BadRequest(); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.AppUserCertificate.FirstOrDefault(t => t.AppUserCertificateID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.AppUserCertificate.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<AppUserCertificate> modeltopatch)
        {
            var topatch = _context.AppUserCertificate.FirstOrDefault(t => t.AppUserCertificateID == id);
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
        public IActionResult UpdateEntry([FromBody] AppUserCertificate objupd)
        {
            var targetObject = _context.AppUserCertificate.FirstOrDefault(t => t.AppUserCertificateID == objupd.AppUserCertificateID);
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
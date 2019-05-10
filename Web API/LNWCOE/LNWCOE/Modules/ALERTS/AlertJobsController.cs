using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LNWCOE.Data;
using LNWCOE.Models.ALERTS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;

namespace LNWCOE.Helpers.ALERTS
{
    [Produces("application/json")]
    [Route("api/AlertJobs")]
    [Authorize]
    public class AlertJobsController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<AlertJobsController> _logger;
        private IConfiguration _configuration;

        public AlertJobsController(AppDbContext context, ILogger<AlertJobsController> logger, IConfiguration configuration)
        {
            this._context = context;
            this._logger = logger;
            this._configuration = configuration;
        }
        [HttpGet]
        public List<AlertJobs> Get()
        {
            var ret = _context.AlertJobs
                .Include("Country")
                .OrderBy(x => x.JobName).ToList();
            return ret;
        }

        [HttpGet("{id}", Name = "GetAlertJobs")]
        public AlertJobs Get(int id)
        {
            var ret = _context.AlertJobs
                .Include("Country")
                .FirstOrDefault(x => x.AlertJobsID == id);
            return ret;
        }

        [HttpPost]
        public IActionResult Create([FromBody] AlertJobs newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.AlertJobs.Add(newmodel);
                _context.SaveChanges();

                return CreatedAtRoute("GetAlertJobs", new { id = newmodel.AlertJobsID }, newmodel);
            }
            else
            { return BadRequest(); }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.AlertJobs.FirstOrDefault(t => t.AlertJobsID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.AlertJobs.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPut]
        public IActionResult UpdateEntry([FromBody] AlertJobs objupd)
        {
            var targetObject = _context.AlertJobs.FirstOrDefault(t => t.AlertJobsID == objupd.AlertJobsID);
            if (targetObject == null)
            { return NotFound(); }

            _context.Entry(targetObject).CurrentValues.SetValues(objupd);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpGet("pastdue")]
        public List<PastDueAlert> GetPastDueAlerts()
        {
            var data = _context.PastDueAlert.AsNoTracking().FromSql($"usp_GetPastDueAlerts_sel")
              .Select(navdata => new PastDueAlert
              {
                  AlertJobQueueID = navdata.AlertJobQueueID,
                  JobId = navdata.JobId,
                  JobName = navdata.JobName,
                  DueDate = navdata.DueDate,
                  DateCreated = navdata.DateCreated,
                  Source = navdata.Source
              }).ToList();

            return (data);
        }

        [HttpGet("inactive")]
        public List<AlertJobs> InActiveAlerts()
        {
            var TwoWeeksAgo = DateTime.UtcNow.AddDays(-14);

            var ret = _context.AlertJobs
                .Where(x => x.IsActive == true && x.DateCreatedUTC < TwoWeeksAgo)
                .Include("Country")
                .OrderBy(x => x.JobName).ToList();
            return ret;

        }

    }
}
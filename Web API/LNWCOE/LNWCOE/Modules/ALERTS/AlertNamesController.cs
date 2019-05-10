using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LNWCOE.Data;
using LNWCOE.Models.ALERTS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.Extensions.Logging;


namespace LNWCOE.Modules.ALERTS
{
    [Produces("application/json")]
    [Route("api/AlertNames")]
    [Authorize]
    public class AlertNamesController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<AlertNamesController> _logger;

        public AlertNamesController(AppDbContext context, ILogger<AlertNamesController> logger)
        {
            this._context = context;
            this._logger = logger;
        }
        [HttpGet]
        public IEnumerable<AlertNames> Get()
        {
            var ret = _context.AlertNames.ToList();
            return ret;
        }

        [HttpGet("{id}")]
        public AlertNames Get(int id)
        {
            var ret = _context.AlertNames.FirstOrDefault(x => x.AlertNameID == id);
            return ret;
        }

        [HttpGet("job/{id}")]
        public List<AlertNames> GetByJobID(int id)
        {
            var ret = _context.AlertNames.Where(x => x.AlertJobsID == id).ToList();
            return ret;
        }
    }
}
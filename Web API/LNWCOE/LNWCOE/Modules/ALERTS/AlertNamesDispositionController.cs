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
    [Route("api/AlertNamesDisposition")]
    [Authorize]
    public class AlertNamesDispositionController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<AlertNamesDispositionController> _logger;

        public AlertNamesDispositionController(AppDbContext context, ILogger<AlertNamesDispositionController> logger)
        {
            this._context = context;
            this._logger = logger;
        }
        [HttpGet]
        public IEnumerable<AlertNamesDisposition> Get()
        {
            var ret = _context.AlertNamesDisposition.ToList();
            return ret;
        }

        [HttpGet("{id}")]
        public AlertNamesDisposition Get(int id)
        {
            var ret = _context.AlertNamesDisposition.FirstOrDefault(x => x.AlertNamesDispositionID == id);
            return ret;
        }
    }
}
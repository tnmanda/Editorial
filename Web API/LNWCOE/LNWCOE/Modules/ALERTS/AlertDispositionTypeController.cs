using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LNWCOE.Data;
using LNWCOE.Models.ALERTS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;


namespace LNWCOE.Modules.ALERTS
{
    [Produces("application/json")]
    [Route("api/AlertDispositionType")]
    [Authorize]
    public class AlertDispositionTypeController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<AlertDispositionTypeController> _logger;

        public AlertDispositionTypeController(AppDbContext context, ILogger<AlertDispositionTypeController> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<AlertDispositionType> Get()
        {
            var ret = _context.AlertDispositionType.ToList();
            return ret;
        }

        [HttpGet("{id}")]
        public AlertDispositionType Get(int id)
        {
            var ret = _context.AlertDispositionType.FirstOrDefault(x => x.AlertDispositionTypeID == id);
            return ret;
        }
    }
}
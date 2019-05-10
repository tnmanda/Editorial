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
    [Route("api/AlertNameDetail")]
    [Authorize]
    public class AlertNameDetailController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<AlertNameDetailController> _logger;

        public AlertNameDetailController(AppDbContext context, ILogger<AlertNameDetailController> logger)
        {
            this._context = context;
            this._logger = logger;
        }
        [HttpGet]
        public IEnumerable<AlertNameDetail> Get()
        {
            var ret = _context.AlertNameDetail.ToList();
            return ret;
        }

        [HttpGet("{id}")]
        public AlertNameDetail Get(int id)
        {
            var ret = _context.AlertNameDetail.FirstOrDefault(x => x.AlertNameDetailID == id);
            return ret;
        }
    }
}
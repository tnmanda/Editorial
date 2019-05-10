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
    [Route("api/EmailPool")]
    [Authorize]
    public class EmailPoolController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<EmailPoolController> _logger;

        public EmailPoolController(AppDbContext context, ILogger<EmailPoolController> logger)
        {
            this._context = context;
            this._logger = logger;
        }
        [HttpGet]
        public IEnumerable<EmailPool> Get()
        {
            var ret = _context.EmailPool.ToList();
            return ret;
        }

        [HttpGet("{id}")]
        public EmailPool Get(int id)
        {
            var ret = _context.EmailPool.FirstOrDefault(x => x.EmailPoolID == id);
            return ret;
        }
    }
}
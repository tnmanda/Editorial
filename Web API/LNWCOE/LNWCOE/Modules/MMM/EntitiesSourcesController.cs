using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LNWCOE.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using LNWCOE.Models.Entity;

namespace LNWCOE.Modules.MMM
{
    [Produces("application/json")]
    [Route("api/EntitiesSources")]
    [Authorize]
    public class EntitiesSourcesController : Controller
    {
        private readonly MMMDBContext _context;
        private readonly ILogger<EntitiesSourcesController> _logger;
        private IConfiguration _configuration;

        public EntitiesSourcesController(IConfiguration configuration, MMMDBContext context, 
            ILogger<EntitiesSourcesController> logger)
        {
            this._context = context;
            this._logger = logger;
            this._configuration = configuration;
        }

        [HttpGet]
        public IEnumerable<EntitiesSources> Get()
        { return _context.EntitiesSources.ToList(); }

        [HttpGet("{id}")]
        public EntitiesSources Get(int id)
        { return _context.EntitiesSources.FirstOrDefault(x => x.SourceID == id); }

    }
}
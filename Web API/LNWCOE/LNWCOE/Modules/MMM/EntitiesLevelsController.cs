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
    [Route("api/EntitiesLevels")]
    [Authorize]
    public class EntitiesLevelsController : Controller
    {
        private readonly MMMDBContext _context;
        private readonly ILogger<EntitiesLevelsController> _logger;
        private IConfiguration _configuration;

        public EntitiesLevelsController(IConfiguration configuration, MMMDBContext context, 
            ILogger<EntitiesLevelsController> logger)
        {
            this._context = context;
            this._logger = logger;
            this._configuration = configuration;
        }

        [HttpGet]
        public IEnumerable<EntitiesLevels> Get()
        { return _context.EntitiesLevels.ToList(); }

        [HttpGet("{id}")]
        public EntitiesLevels Get(int id)
        { return _context.EntitiesLevels.FirstOrDefault(x => x.LevelID == id); }

    }
}
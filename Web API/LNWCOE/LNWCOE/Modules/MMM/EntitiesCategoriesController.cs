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
    [Route("api/EntitiesCategories")]
    [Authorize]
    public class EntitiesCategoriesController : Controller
    {
        private readonly MMMDBContext _context;
        private readonly ILogger<EntitiesCategoriesController> _logger;
        private IConfiguration _configuration;

        public EntitiesCategoriesController(IConfiguration configuration, MMMDBContext context, 
            ILogger<EntitiesCategoriesController> logger)
        {
            this._context = context;
            this._logger = logger;
            this._configuration = configuration;
        }

        [HttpGet]
        public IEnumerable<EntitiesCategories> Get()
        { return _context.EntitiesCategories.ToList(); }

        [HttpGet("{id}")]
        public EntitiesCategories Get(int id)
        { return _context.EntitiesCategories.FirstOrDefault(x => x.ID == id); }

    }
}
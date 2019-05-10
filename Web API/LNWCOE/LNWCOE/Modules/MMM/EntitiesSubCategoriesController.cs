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
    [Route("api/EntitiesSubCategories")]
    [Authorize]
    public class EntitiesSubCategoriesController : Controller
    {
        private readonly MMMDBContext _context;
        private readonly ILogger<EntitiesSubCategoriesController> _logger;
        private IConfiguration _configuration;

        public EntitiesSubCategoriesController(IConfiguration configuration, MMMDBContext context, 
            ILogger<EntitiesSubCategoriesController> logger)
        {
            this._context = context;
            this._logger = logger;
            this._configuration = configuration;

        }

        [HttpGet]
        public IEnumerable<EntitiesSubCategories> Get()
        { return _context.EntitiesSubCategories.ToList(); }

        [HttpGet("{id}")]
        public EntitiesSubCategories Get(int id)
        { return _context.EntitiesSubCategories.FirstOrDefault(x => x.SubCatID == id); }

    }
}
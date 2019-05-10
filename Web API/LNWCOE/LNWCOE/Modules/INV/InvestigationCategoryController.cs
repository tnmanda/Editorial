using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LNWCOE.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using LNWCOE.Models.INV;

namespace LNWCOE.Modules.INV
{
    [Produces("application/json")]
    [Route("api/InvestigationCategory")]
    [Authorize]
    public class InvestigationCategoryController : Controller
    {
        private readonly AppDbContext _context;
        //private readonly ILogger<InvestigationCategoryController> _logger;

        //public InvestigationCategoryController(AppDbContext context, ILogger<InvestigationCategoryController> logger)
        public InvestigationCategoryController(AppDbContext context)
        {
            this._context = context;
            //this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<InvestigationCategory> Get()
        {
            var ret = _context.InvestigationCategory.ToList();
            return ret;
        }
    }
}
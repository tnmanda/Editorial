using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LNWCOE.Data;
using LNWCOE.Models.News;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using LNWCOE.Helpers;

namespace LNWCOE.Modules.NEWS
{
    [Produces("application/json")]
    [Route("api/News/NewsStatus")]
    [Authorize]
    public class NewsStatusController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<NewsStatusController> _logger;

        public NewsStatusController(AppDbContext context, ILogger<NewsStatusController> logger)
        {
            this._context = context;
            this._logger = logger;
        }
        [HttpGet]
        public IEnumerable<NewsStatus> Get()
        {
            var ret = _context.NewsStatus.ToList();
            return ret;
        }

        [HttpGet("{id}", Name = "GetNewsStatus")]
        public NewsStatus Get(int id)
        {
            var ret = _context.NewsStatus.FirstOrDefault(x => x.NewsStatusValue == id);
            return ret;
        }

        [HttpPost]
        public IActionResult Create([FromBody] NewsStatus newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.NewsStatus.Add(newmodel);
                ReturnData ret;
                ret = _context.SaveData();

                if (ret.Message == "Success")
                {
                    return CreatedAtRoute("GetNewsStatus", new { id = newmodel.NewsStatusValue }, newmodel);
                }

                return NotFound(ret);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.NewsStatus.FirstOrDefault(t => t.NewsStatusValue == id);
            if (todelete == null)
            { return NotFound(); }

            _context.NewsStatus.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPut]
        public IActionResult UpdateEntry([FromBody] NewsStatus objupd)
        {
            var targetObject = _context.NewsStatus.FirstOrDefault(t => t.NewsStatusValue == objupd.NewsStatusValue);
            if (targetObject == null)
            { return NotFound(); }

            _context.Entry(targetObject).CurrentValues.SetValues(objupd);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }
    }
}
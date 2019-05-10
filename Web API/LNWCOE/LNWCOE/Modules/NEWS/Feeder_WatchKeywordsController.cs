using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LNWCOE.Data;
using LNWCOE.Models.News;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using LNWCOE.Helpers;
using System;

namespace LNWCOE.Modules.NEWS
{
    [Produces("application/json")]
    [Route("api/News/Feeder_WatchKeywords")]
    [Authorize]
    public class Feeder_WatchKeywordsController : Controller
    {
        private readonly NEWSDBContext _context;
        private readonly ILogger<Feeder_WatchKeywordsController> _logger;

        public Feeder_WatchKeywordsController(NEWSDBContext context, ILogger<Feeder_WatchKeywordsController> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public IEnumerable<Feeder_WatchKeywords> Get()
        {
            var ret = _context.Feeder_WatchKeywords.ToList();
            return ret;
        }

        [HttpGet("{id}", Name = "GetFeeder_WatchKeywords")]
        public Feeder_WatchKeywords Get(int id)
        {
            var ret = _context.Feeder_WatchKeywords.FirstOrDefault(x => x.pkKeywordID == id);
            return ret;
        }

        [HttpGet("watch/{id}")]
        public List<Feeder_WatchKeywords> GetByWatch(int id)
        {
            var ret = _context.Feeder_WatchKeywords.Where(x => x.fkWatchID == id).ToList();
            return ret;
        }

        [HttpPost]
        public IActionResult Create([FromBody] Feeder_WatchKeywords newmodel)
        {
            if (ModelState.IsValid)
            {
                var Message = "";
                var RecordID = 0;

                try
                {
                    RecordID = _context.Feeder_WatchKeywords.Max(id => id.pkKeywordID);
                    newmodel.pkKeywordID = RecordID + 1;

                    _context.Feeder_WatchKeywords.Add(newmodel);
                    _context.SaveChanges();
                }
                catch (Exception e)
                {
                    Message = e.Message + " - " + e.InnerException.Message;
                    return BadRequest(Message);
                }
                return CreatedAtRoute("GetFeeder_WatchKeywords", new { id = newmodel.pkKeywordID }, newmodel);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.Feeder_WatchKeywords.FirstOrDefault(t => t.pkKeywordID == id);
            if (todelete == null)
            { return NotFound(); }

            try
            {
                _context.Feeder_WatchKeywords.Remove(todelete);
                _context.SaveChanges();
            }
            catch (Exception e)
            {
                var Message = "";
                Message = e.Message + " - " + e.InnerException.Message;
                return BadRequest(Message);
            }
            return Ok();
        }

        [HttpPut]
        public IActionResult UpdateEntry([FromBody] Feeder_WatchKeywords objupd)
        {
            if (ModelState.IsValid)
            {
                var targetObject = _context.Feeder_WatchKeywords.FirstOrDefault(t => t.pkKeywordID == objupd.pkKeywordID);
                if (targetObject == null)
                { return NotFound(); }

                try
                {
                    _context.Entry(targetObject).CurrentValues.SetValues(objupd);
                    _context.SaveChanges();
                }
                catch (Exception e)
                {
                    var Message = "";
                    Message = e.Message + " - " + e.InnerException.Message;
                    return BadRequest(Message);
                }
                return Ok();
            }
            return NotFound();
        }


    }
}
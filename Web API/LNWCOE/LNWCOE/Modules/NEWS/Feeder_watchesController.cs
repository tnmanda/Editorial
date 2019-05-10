using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LNWCOE.Data;
using LNWCOE.Models.News;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using System;
using LNWCOE.Models.Admin;

namespace LNWCOE.Modules.NEWS
{
    [Produces("application/json")]
    [Route("api/News/Feeder_watches")]
    [Authorize]
    public class Feeder_watchesController : Controller
    {
        private readonly AppDbContext _context;
        private readonly NEWSDBContext _NewsDBcontext;
        private readonly ILogger<Feeder_watchesController> _logger;

        public Feeder_watchesController(NEWSDBContext NewsDBcontext, AppDbContext context, ILogger<Feeder_watchesController> logger)
        {
            this._NewsDBcontext = NewsDBcontext;
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public JsonResult Get()
        {
            var Watches = _NewsDBcontext.Feeder_Watches.ToList();
            var Languages = _context.LanguageType.ToList();

            var ret = (from watches in Watches 
                       join langs in Languages on watches.fkLanguageID equals langs.LanguageTypeID
                       select new 
                       {
                           pkWatchID = watches.pkWatchID,
                           Caption = watches.Caption,
                           Description = watches.Description,
                           InArtikleTitle = watches.InArtikleTitle,
                           InArtikleDescription = watches.InArtikleDescription,
                           WholeWords = watches.WholeWords,
                           MAtchAllKeywords = watches.MAtchAllKeywords,
                           fkLanguageID = watches.fkLanguageID,
                           Comments = watches.Comments,
                           LastFilterDate = watches.LastFilterDate,
                           Language = new
                           {
                               LanguageTypeID = langs.LanguageTypeID,
                               LanguageTypeName = langs.LanguageTypeName,
                               LanguageTypeDesc = langs.LanguageTypeDesc,
                               IsInList = langs.IsInList,
                               IsActive = langs.IsActive,
                               CreatedBy = langs.CreatedBy,
                               DateCreatedUTC = langs.DateCreatedUTC,
                               UpdatedBy = langs.UpdatedBy,
                               LastUpdatedUTC = langs.LastUpdatedUTC
                           }
                       });

            return Json(ret);
        }

        [HttpGet("{id}", Name = "GetFeeder_watches")]
        public JsonResult Get(int id)
        {
            
            var watch = _NewsDBcontext.Feeder_Watches.Where(x => x.pkWatchID == id).FirstOrDefault();
            try
            {
                var lang = _context.LanguageType.Where(x => x.LanguageTypeID == watch.fkLanguageID).FirstOrDefault();
                var ret = Json(new { Feeder_watches = watch, Language = lang });

                var ret2 = new
                {
                    pkWatchID = watch.pkWatchID,
                    Caption = watch.Caption,
                    Description = watch.Description,
                    InArtikleTitle = watch.InArtikleTitle,
                    InArtikleDescription = watch.InArtikleDescription,
                    WholeWords = watch.WholeWords,
                    MAtchAllKeywords = watch.MAtchAllKeywords,
                    fkLanguageID = watch.fkLanguageID,
                    Comments = watch.Comments,
                    LastFilterDate = watch.LastFilterDate,
                    Language = lang
                };

                return Json(ret2);
            }
            catch
            {
                if (watch != null)
                {
                    var ret = Json(new { Feeder_watches = watch, Language = "" });
                    return ret;
                }
                else
                {
                    return Json("Not Found");
                }
            }
            
        }

        [HttpPost]
        public IActionResult Create([FromBody] Feeder_watches newmodel)
        {
            if (ModelState.IsValid)
            {
                var Message = "";
                var RecordID = 0;

                try
                {
                    RecordID = _NewsDBcontext.Feeder_Watches.Max(id => id.pkWatchID);
                    newmodel.pkWatchID = RecordID + 1;

                    _NewsDBcontext.Feeder_Watches.Add(newmodel);
                    _NewsDBcontext.SaveChanges();
                }
                catch(Exception e)
                {
                    Message = e.Message + " - " + e.InnerException.Message;
                    return BadRequest(Message);
                }
                return CreatedAtRoute("GetFeeder_watches", new { id = newmodel.pkWatchID }, newmodel);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _NewsDBcontext.Feeder_Watches.FirstOrDefault(t => t.pkWatchID == id);
            if (todelete == null)
            { return NotFound(); }
            
            try
            {
                _NewsDBcontext.Feeder_Watches.Remove(todelete);
                _NewsDBcontext.SaveChanges();
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
        public IActionResult UpdateEntry([FromBody] Feeder_watches objupd)
        {
            if (ModelState.IsValid)
            {
                var targetObject = _NewsDBcontext.Feeder_Watches.FirstOrDefault(t => t.pkWatchID == objupd.pkWatchID);
                if (targetObject == null)
                { return NotFound(); }

                try
                {
                    _NewsDBcontext.Entry(targetObject).CurrentValues.SetValues(objupd);
                    _NewsDBcontext.SaveChanges();
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
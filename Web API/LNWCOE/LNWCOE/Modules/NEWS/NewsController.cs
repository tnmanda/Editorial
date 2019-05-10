using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LNWCOE.Data;
using Microsoft.AspNetCore.Authorization;
using LNWCOE.Models.News;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using LNWCOE.Models.HRData;
using LNWCOE.Helpers;
using System;
using Newtonsoft.Json;
using LNWCOE.Models.Admin;
using Newtonsoft.Json.Linq;

namespace LNWCOE.Modules.NEWS
{
    [Produces("application/json")]
    [Route("api/News")]
    [Authorize]
    public class NewsController : Controller
    {
        private readonly NEWSDBContext _NewsDBcontext;
        private readonly AppDbContext _context;
        //private readonly ILogger<NewsController> _logger;
        private IConfiguration _configuration;

        public NewsController(NEWSDBContext NewsDBcontext, AppDbContext context, IConfiguration configuration)
        {
            this._NewsDBcontext = NewsDBcontext;
            this._context = context;
            _configuration = configuration;
        }
        
        [HttpGet("nav")]
        public JsonResult GetNewsNavigation()
        {
            var NewsDatePeriod = _configuration.GetSection("EditorialSettings:NewsDatePeriod").Value;

            IQueryable<NewsJobsNav> navall = _context.NewsJobsNav.AsNoTracking().FromSql($"usp_NewsGetNavigation_sel {NewsDatePeriod}")
               .Select(navdata => new NewsJobsNav
               {
                   WatchID = navdata.WatchID,
                   Caption = navdata.Caption,
                   CountryName = navdata.CountryName,
                   CountryID = navdata.CountryID,
                   LanguageID = navdata.LanguageID,
                   LanguageName = navdata.LanguageName,
               });

            var newsnavdata = (from bycountry in navall
                               group bycountry by new { bycountry.CountryName, bycountry.CountryID } into Grouping
                               select new
                               {
                                   label = Grouping.Key.CountryName + "(" + Grouping.Count() + ")",
                                   children = from bylanguage in Grouping
                                              group bylanguage by new { bylanguage.LanguageID, bylanguage.LanguageName } into SubGrouping
                                              select new
                                              {
                                                  label = SubGrouping.Key.LanguageName + "(" + SubGrouping.Count() + ")",
                                                  children = from byname in SubGrouping
                                                             group byname by new { byname.Caption, byname.WatchID } into SubSubGrouping
                                                             select new
                                                             {
                                                                 label = SubSubGrouping.Key.Caption + " (" + SubSubGrouping.Count() + ")",
                                                                 data = new
                                                                 {
                                                                     CountryName = Grouping.Key.CountryName,
                                                                     CountryID = Grouping.Key.CountryID,
                                                                     LanguageName = SubGrouping.Key.LanguageName,
                                                                     LanguageID = SubGrouping.Key.LanguageID,
                                                                     Caption = SubSubGrouping.Key.Caption,
                                                                     WatchID = SubSubGrouping.Key.WatchID
                                                                 }
                                                             }
                                              }
                                }).ToList();


            // My

            return Json(newsnavdata);
        }


        [HttpGet("nav/{appuserid}")]
        public JsonResult GetNewsNavigationWithUser(int appuserid)
        {
            var NewsDatePeriod = _configuration.GetSection("EditorialSettings:NewsDatePeriod").Value;

            IQueryable<NewsJobsNav> navall = _context.NewsJobsNav.AsNoTracking().FromSql($"usp_NewsGetNavigation_sel {NewsDatePeriod}")
               .Select(navdata => new NewsJobsNav
               {
                   WatchID = navdata.WatchID,
                   Caption = navdata.Caption,
                   CountryName = navdata.CountryName,
                   CountryID = navdata.CountryID,
                   LanguageID = navdata.LanguageID,
                   LanguageName = navdata.LanguageName,
               });

            // All
            var newsnavdata = (from bycountry in navall
                               group bycountry by new { bycountry.CountryName, bycountry.CountryID } into Grouping
                               select new
                               {
                                   label = Grouping.Key.CountryName + " (" + Grouping.Count() + ")",
                                   children = from bylanguage in Grouping
                                              group bylanguage by new { bylanguage.LanguageID, bylanguage.LanguageName } into SubGrouping
                                              select new
                                              {
                                                  label = SubGrouping.Key.LanguageName + " (" + SubGrouping.Count() + ")",
                                                  children = from byname in SubGrouping
                                                             group byname by new { byname.Caption, byname.WatchID } into SubSubGrouping
                                                             select new
                                                             {
                                                                 label = SubSubGrouping.Key.Caption + " (" + SubSubGrouping.Count() + ")",
                                                                 data = new
                                                                 {
                                                                     countryName = Grouping.Key.CountryName,
                                                                     countryID = Grouping.Key.CountryID,
                                                                     languageName = SubGrouping.Key.LanguageName,
                                                                     languageID = SubGrouping.Key.LanguageID,
                                                                     caption = SubSubGrouping.Key.Caption,
                                                                     watchID = SubSubGrouping.Key.WatchID
                                                                 }
                                                             }
                                              }
                               }).ToList();

            // My
            var userCountries = (from usercontry in _context.AppUserCountry
                                 .Where(x => x.AppUserID == appuserid)
                                 select usercontry.CountryID).ToList();

            var userLanguages = (from userlangs in _context.AppUserLanguage
                                 .Where(x => x.AppUserID == appuserid)
                                 select userlangs.LanguageTypeID).ToList();


            var newsnavdataforuser = (from navforuser in navall
                                   where userCountries.Contains(navforuser.CountryID) 
                                    || userLanguages.Contains(navforuser.LanguageID)
                                          select navforuser);

            var newsnavdataforusergrouped = (from bycountry in newsnavdataforuser
                                             group bycountry by new { bycountry.CountryName, bycountry.CountryID } into Grouping
                                             select new
                                             {
                                                 label = Grouping.Key.CountryName + " (" + Grouping.Count() + ")",
                                                 children = from bylanguage in Grouping
                                                            group bylanguage by new { bylanguage.LanguageID, bylanguage.LanguageName } into SubGrouping
                                                            select new
                                                            {
                                                                label = SubGrouping.Key.LanguageName + " (" + SubGrouping.Count() + ")",
                                                                children = from byname in SubGrouping
                                                                           group byname by new { byname.Caption, byname.WatchID } into SubSubGrouping
                                                                           select new
                                                                           {
                                                                               label = SubSubGrouping.Key.Caption + " (" + SubSubGrouping.Count() + ")",
                                                                               data = new
                                                                               {
                                                                                   countryName = Grouping.Key.CountryName,
                                                                                   countryID = Grouping.Key.CountryID,
                                                                                   languageName = SubGrouping.Key.LanguageName,
                                                                                   languageID = SubGrouping.Key.LanguageID,
                                                                                   caption = SubSubGrouping.Key.Caption,
                                                                                   watchID = SubSubGrouping.Key.WatchID
                                                                               }
                                                                           }
                                                            }
                                             }).ToList();

            var alldata = JObject.FromObject(new { label = "All", children = newsnavdata });

            var alluserdata = JObject.FromObject(new { label = "My Work", children = newsnavdataforusergrouped });

            var t = new JArray(alluserdata, alldata);

            return Json(t);
        }

        [HttpPost("filter")]
        public JsonResult GetNewsNavigationFilter([FromBody] NewsFilter filter)
        {
            if (ModelState.IsValid && filter != null)
            {
                var dateperiod = _configuration.GetSection("EditorialSettings:NewsDatePeriod").Value;
                var watchID = filter.WatchID;
                var countryID = filter.CountryID;
                var state = filter.State;

                var result = _context.NewsData
                    .FromSql($"usp_GetNewsEntries_sel @watchID={watchID}, @dateperiod={dateperiod}, @countryID={countryID}, @state={state}, @articleID=0 ")
                    .Select(pg => new NewsData
                    {
                        id = pg.id,
                        fkItemID = pg.fkItemID,
                        fkWatchID = pg.fkWatchID,
                        fkCountryID = pg.fkCountryID,
                        itemType = pg.itemType,
                        State = pg.State,
                        dateAdded = pg.dateAdded,
                        WatchName = pg.WatchName,
                        ArticleID = pg.ArticleID,
                        ArticleTitle = pg.ArticleTitle,
                        ArticleDescription = pg.ArticleDescription,
                        ArticleURL = pg.ArticleURL,
                        FeedID = pg.FeedID,
                        FeedName = pg.FeedName,
                        FeedURL = pg.FeedURL,
                        LockedTo = pg.LockedTo
                    }).ToList();

                return Json(result);
            }
            return Json("No Data");
        }

        [HttpPost("wrkitem")]
        public JsonResult CheckWorkItemID([FromBody] WorkItemPostData postData)
        {
            if (!ModelState.IsValid)
            {
                var badrequest = new
                {
                    Success = false,
                    Message = "Error in Input"
                };
                return Json(badrequest);
            }

            // Check if HR is up
            var hruri = _configuration.GetSection("HumanReview:uri").Value + "auth/token";
            var hrResponse = Common.ServerStatusBy(hruri);

            // We expect a 400 - Bad Request, anything else specifically 404 Not Found, return an error
            if (hrResponse.StatusCode == 404)
            {
                { return Json("Error: Human Review Service unavailable"); }
            }

            var Message = "";

            if (postData.ModuleTableEntryID == 0)
            {
                Message = "No News Entry given";
                return Json(Message);
            }
            
            if (postData.token == "")
            {
                Message = "No token given";
                return Json(Message);
            }

            var token = postData.token;


            // check if News Entry exists
            var NewsEntry = _NewsDBcontext.FeedItemQueue.Where(t => t.id == postData.ModuleTableEntryID).FirstOrDefault();
            if(NewsEntry == null)
            {
                Message = "News Entry does not exist";
                return Json(Message);
            }
            // check for WorkItemID
            var MappingEntry = _context.HRWorkItemDataMap.Where(t => t.ModuleTableEntryID == postData.ModuleTableEntryID).FirstOrDefault();

            //check if there is an existing WorkItem previously defined
            var DefinedWorkItemGuid = "";
            if (MappingEntry != null)
            {
                DefinedWorkItemGuid = MappingEntry.WorkItemID.ToString();
            }
            
            ReturnData retValue;

            Guid GuidToSet;

            if (DefinedWorkItemGuid != "")
            {
                GuidToSet = new Guid(DefinedWorkItemGuid.ToString());
            }
            else
            {
                var Modules = _context.ApplicationModules;
                var QueueGuid = (from mods in Modules
                                 where mods.ModuleName == "News Queue"
                                 select mods.QueueGuid).FirstOrDefault();

                var JsonData = JsonConvert.SerializeObject(NewsEntry);

                WorkItemRequest req = new WorkItemRequest();
                req.name = "Work Item ID entry for News Entry " + postData.ModuleTableEntryID;
                req.description = "Work Item ID entry for News Entry " + postData.ModuleTableEntryID;
                req.queueGuid = QueueGuid;
                req.statusDetailTypeGuid = _configuration.GetSection("HumanReview:statusDetailTypeGuid_ins").Value;
                req.reviewTypeGuid = _configuration.GetSection("HumanReview:reviewTypeGuid_ins").Value;
                req.formDefinitionJson = JsonData;
                req.isActive = true;

                var returnGuid = Common.getWorkItemAsync(req, token, _configuration);
                
                if (returnGuid.value.workItemGuid == null)
                {
                    var workitemnotcreated = new
                    {
                        Success = false,
                        Message = "WorkItem not created"
                    };
                    return Json(workitemnotcreated);
                    // TODO: LOG THIS ERROR
                }

                GuidToSet = new Guid(returnGuid.value.workItemGuid);
            }

            if (MappingEntry == null) // No Entry in HR WorkItemGuid table, insert one
            {
                var newDataMap = new HRWorkItemDataMap();
                newDataMap.WorkUnitTypeID = 5; // Module type 
                                               /*
                                               3	Investigation
                                               4	Alerts
                                               5	News Queue
                                               6	BWQ
                                               */
                // Row ID in Module table, in this case id column of NewsFeed..FeedItemQueue
                newDataMap.ModuleTableEntryID = postData.ModuleTableEntryID;

                newDataMap.WorkItemID = GuidToSet; //HR WorkItem GUID

                newDataMap.UpdatedBy = postData.appuserid.ToString();
                newDataMap.CreatedBy = postData.appuserid.ToString();
                newDataMap.DateCreatedUTC = DateTime.UtcNow;
                newDataMap.LastUpdatedUTC = DateTime.UtcNow;

                _context.HRWorkItemDataMap.Add(newDataMap);

                retValue = _context.SaveData();

                if (retValue.Message != "Success")
                { return Json(retValue); }

            }

            
            
            return Json(new { WorkItemGuid = GuidToSet });

        }

        [HttpGet("guid/{guid}")]
        public JsonResult GetByGuid(Guid guid)
        {
            var Message = "";

            var MappingEntry = _context.HRWorkItemDataMap
                .Where(t => t.WorkItemID == guid)
                .FirstOrDefault();

            if (MappingEntry == null)
            {
                Message = "News Entry does not exist";
                return Json(Message);
            }

            var FeedItemQueueEntry = _NewsDBcontext.FeedItemQueue
                .Where(t => t.id == MappingEntry.ModuleTableEntryID)
                .FirstOrDefault();

            if (FeedItemQueueEntry == null)
            {
                Message = "News Entry does not exist";
                return Json(Message);
            }

            var Feeder_WatchesEntry = _NewsDBcontext.Feeder_Watches
                .Where(t => t.pkWatchID == FeedItemQueueEntry.fkWatchID)
                .FirstOrDefault();

            if (Feeder_WatchesEntry == null)
            {
                Message = "News Watch does not exist";
                return Json(Message);
            }

            var Feeder_FeedArtiklesEntry = _NewsDBcontext.Feeder_FeedArtikles
               .Where(t => t.pkArtikleID == FeedItemQueueEntry.fkItemID)
               .FirstOrDefault();

            if (Feeder_FeedArtiklesEntry == null)
            {
                Message = "News Article does not exist";
                return Json(Message);
            }

            var Feeder_FeedsEntry = _NewsDBcontext.Feeder_Feeds
               .Where(t => t.pkFeedID == Feeder_FeedArtiklesEntry.fkFeedID)
               .FirstOrDefault();

            var NewsLockEntry = _NewsDBcontext.FeedItemQueueLocks
              .Where(t => t.fkItemID == FeedItemQueueEntry.id)
              .FirstOrDefault();

            AppUser LockedToUser = new AppUser();

            if (NewsLockEntry != null)
            {
                LockedToUser = _context.AppUser
                    .Where(t => t.AppUserID == NewsLockEntry.LockedByRecipientID)
                    .FirstOrDefault();
            }

            var returnData = Json(new { FeedItemQueue = FeedItemQueueEntry, Watch = Feeder_WatchesEntry, Article = Feeder_FeedArtiklesEntry, Feed = Feeder_FeedsEntry, LockedTo = LockedToUser } );

            return Json(returnData.Value);
        }

        [HttpGet("search/{id}")]
        public JsonResult SearchNewsQueueEntryById(int id)
        {
            if (ModelState.IsValid && id != 0)
            {
                var dateperiod = _configuration.GetSection("EditorialSettings:NewsDatePeriod").Value;

                var result = _context.NewsData
                    .FromSql($"usp_GetNewsEntries_sel @watchID=0, @dateperiod={dateperiod}, @countryID=0, @state=0, @articleID={id} ")
                    .Select(pg => new NewsData
                    {
                        id = pg.id,
                        fkItemID = pg.fkItemID,
                        fkWatchID = pg.fkWatchID,
                        fkCountryID = pg.fkCountryID,
                        itemType = pg.itemType,
                        State = pg.State,
                        dateAdded = pg.dateAdded,
                        WatchName = pg.WatchName,
                        ArticleID = pg.ArticleID,
                        ArticleTitle = pg.ArticleTitle,
                        ArticleDescription = pg.ArticleDescription,
                        ArticleURL = pg.ArticleURL,
                        FeedID = pg.FeedID,
                        FeedName = pg.FeedName,
                        FeedURL = pg.FeedURL,
                        LockedTo = pg.LockedTo
                    });

                return Json(result.ToList());
            }
            return Json("No Data");
        }

        [HttpPost("lock")]
        public IActionResult LockNewsItem([FromBody] LockEntry lockentry)
        {
            var Message = "";

            var NewsLockEntry = _NewsDBcontext.FeedItemQueueLocks
              .Where(t => t.fkItemID == lockentry.IDFromWorkUnitsDBTable)
              .FirstOrDefault();

            if (NewsLockEntry == null)
            {
                var MaxID = _NewsDBcontext.FeedItemQueueLocks.Max(x => x.ID);
              

                FeedItemQueueLocks newLock = new FeedItemQueueLocks();
                newLock.ID = MaxID + 1;
                newLock.LockedByRecipientID = lockentry.AppUserID;
                newLock.DateTimeItemWasLocked = DateTime.UtcNow;
                newLock.fkItemID = lockentry.IDFromWorkUnitsDBTable;

                _NewsDBcontext.FeedItemQueueLocks.Add(newLock);
                try
                {
                    _NewsDBcontext.SaveChanges();
                    return Ok();
                }
                catch (Exception e)
                {
                    var logInfo = e.Message + " - " + e.InnerException ;
                    { return BadRequest(e.Message); }
                }
            }
            else
            {
                var thisUser = _context.AppUser
                    .Where(t => t.AppUserID == NewsLockEntry.LockedByRecipientID)
                    .FirstOrDefault();
                if (thisUser != null)
                {
                    Message = thisUser.AppUserName + " (" + thisUser.AppUserID + ")";
                }
                else
                {
                    Message = "User ID - " + NewsLockEntry.LockedByRecipientID.ToString();
                }

                return NotFound("This Record is locked to " + Message);
            }

        }

        [HttpPost("unlock")]
        public IActionResult UnLockNewsItem([FromBody] LockEntry lockentry)
        {
            var Message = "";
            var AppUserId = lockentry.AppUserID;

            var NewsLockEntry = _NewsDBcontext.FeedItemQueueLocks
              .Where(t => t.fkItemID == lockentry.IDFromWorkUnitsDBTable)
              .FirstOrDefault();

            if (NewsLockEntry != null)
            {
                if (AppUserId == NewsLockEntry.LockedByRecipientID)
                {
                    _NewsDBcontext.FeedItemQueueLocks.Remove(NewsLockEntry);
                    try
                    {
                        _NewsDBcontext.SaveChanges();
                        return Ok("Record unlocked");
                    }
                    catch (Exception e)
                    {
                        var logInfo = e.Message + " - " + e.InnerException;
                        { return BadRequest(e.Message); }
                    }
                }
                else
                {
                    var thisUser = _context.AppUser
                        .Where(t => t.AppUserID == NewsLockEntry.LockedByRecipientID)
                        .FirstOrDefault();
                    if (thisUser != null)
                    {
                        Message = thisUser.AppUserName + " (" + thisUser.AppUserID + ")";
                    }
                    else
                    {
                        Message = "User ID - " + NewsLockEntry.LockedByRecipientID.ToString();
                    }

                    return BadRequest("This Record is locked to " + Message);
                }
            }

            return NotFound("Lock for News record not found");
        }
    }
}
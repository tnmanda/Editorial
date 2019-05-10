using LNWCOE.Models.Context;
using LNWCOE.Models.News;
using LNWCOE.Module.News.Interface;
using Microsoft.Extensions.Configuration;
using Repository.DataAccess;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Newtonsoft.Json.Linq;
using LNWCOE.Models.HR;
using System.IdentityModel.Tokens.Jwt;
using LNWCOE.Service.Helpers;
using System;
using Newtonsoft.Json;
using LNWCOE.Models.Admin;
using System.Collections.Generic;

namespace LNWCOE.Module.News.Implementation
{
    public class NewsRepository : Repository<NewsData>, INewsRepository
    {
        private new readonly EditorialDataContext _context;
        private readonly NewsFeedDataContext _newsfeedcontext;


        public NewsRepository(NewsFeedDataContext newsfeedcontext, EditorialDataContext context) : base(context)
        {
            _newsfeedcontext = newsfeedcontext;
            _context = context;
        }

        /// <summary>
        /// Left Navigation data for the NewsFeed page
        /// </summary>
        /// <param name="appuserid"></param>
        /// <param name="configuration"></param>
        /// <returns></returns>
        public object GetNewsNavigation(int appuserid, IConfiguration configuration)
        {
            var NewsDatePeriod = configuration.GetSection("EditorialSettings:NewsDatePeriod").Value;

           
            List<NewsJobsNav> navall = _context.NewsJobsNav.AsNoTracking().FromSql("usp_NewsGetNavigation_sel {0}", NewsDatePeriod)
               .Select(navdata => new NewsJobsNav
               {
                   WatchID = navdata.WatchID,
                   Caption = navdata.Caption,
                   CountryName = navdata.CountryName,
                   CountryID = navdata.CountryID,
                   LanguageID = navdata.LanguageID,
                   LanguageName = navdata.LanguageName,
               }).ToList();

            


            // All
            #region All data
            var newsnavdata = (from bycountry in navall
                               group bycountry by new { bycountry.CountryName, bycountry.CountryID } into Grouping
                               select new
                               {
                                   label = Grouping.Key.CountryName + " (" + Grouping.Count() + ")",
                                   data = new
                                   {
                                       countryName = Grouping.Key.CountryName,
                                       countryID = Grouping.Key.CountryID,

                                   },
                                   children = from bylanguage in Grouping
                                              group bylanguage by new { bylanguage.LanguageID, bylanguage.LanguageName } into SubGrouping
                                              select new
                                              {
                                                  label = SubGrouping.Key.LanguageName + " (" + SubGrouping.Count() + ")",
                                                  data = new
                                                  {
                                                      countryName = Grouping.Key.CountryName,
                                                      countryID = Grouping.Key.CountryID,
                                                      languageName = SubGrouping.Key.LanguageName,
                                                      languageID = SubGrouping.Key.LanguageID,
                                                  },
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
            #endregion


            // My Work
            #region My Work
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
                                                 data = new 
                                                 {
                                                     countryName = Grouping.Key.CountryName,
                                                     countryID = Grouping.Key.CountryID
                                                 },
                                                 children = from bylanguage in Grouping
                                                            group bylanguage by new { bylanguage.LanguageID, bylanguage.LanguageName } into SubGrouping
                                                            select new
                                                            {
                                                                label = SubGrouping.Key.LanguageName + " (" + SubGrouping.Count() + ")",
                                                                data = new 
                                                                {
                                                                    countryName = Grouping.Key.CountryName,
                                                                    countryID = Grouping.Key.CountryID,
                                                                    languageName = SubGrouping.Key.LanguageName,
                                                                    languageID = SubGrouping.Key.LanguageID
                                                                },
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
            #endregion
            var alldata = JObject.FromObject(new { label = "All", children = newsnavdata });

            var alluserdata = JObject.FromObject(new { label = "My Work", children = newsnavdataforusergrouped });

            var result = new JArray(alluserdata, alldata);

            return result;

        }


        /// <summary>
        /// Filtered results, right pane for the news feed page
        /// </summary>
        /// <param name="filter"></param>
        /// <param name="configuration"></param>
        /// <returns></returns>
        public object GetFilteredNewsNavigation(NewsFilter filter, IConfiguration configuration)
        {
            var dateperiod = configuration.GetSection("EditorialSettings:NewsDatePeriod").Value;
            var watchID = filter.WatchID;
            var countryID = filter.CountryID;
            var state = filter.State;
            var languageId = filter.LanguageID;

            var result = _context.NewsData
                .AsNoTracking()
                .FromSql("usp_GetNewsEntries_sel @watchID={0}, @dateperiod={1}, @countryID={2}, @state={3}, @articleID={4}, @languageID={5} "
                ,watchID
                ,dateperiod
                ,countryID
                ,state
                ,0
                ,languageId
                )
                .Select(pg => new NewsData
                {
                    Id = pg.Id,
                    FkItemID = pg.FkItemID,
                    FkWatchID = pg.FkWatchID,
                    FkCountryID = pg.FkCountryID,
                    ItemType = pg.ItemType,
                    State = pg.State,
                    DateAdded = pg.DateAdded,
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

            return result;

        }

        /// <summary>
        /// Gets / Sets a workitem ID entry for a news Entity
        /// </summary>
        /// <param name="postData"></param>
        /// <param name="configuration"></param>
        /// <returns></returns>
        public object CheckNewsWorkItemID(WorkItemPostData postData, IConfiguration configuration)
        {
            bool DataValid = ValidateNewsData(postData, configuration);
            if (DataValid == false)
            {
                return null;
            }

            var HRtoken = postData.Token;

            var NewsEntry = _newsfeedcontext.FeedItemQueue.Where(t => t.id == postData.ModuleTableEntryID).FirstOrDefault();
            if (NewsEntry == null)
            {
                return null;
            }

            Guid GuidToSet;

            // check for WorkItemID
            var MappingEntry = _context.HRWorkItemDataMap.Where(t => t.ModuleTableEntryID == postData.ModuleTableEntryID).FirstOrDefault();
            var DefinedWorkItemGuid = "";
            if (MappingEntry != null)
            {
                DefinedWorkItemGuid = MappingEntry.WorkItemID.ToString();
            }

            if (DefinedWorkItemGuid != "")
            {
                GuidToSet = new Guid(DefinedWorkItemGuid.ToString());
            }
            else
            {
                var QueueGuid = (from module in _context.ApplicationModules
                                 where module.ModuleName == EditorialModules.News
                                 select module.QueueGuid).FirstOrDefault();

                var JsonData = JsonConvert.SerializeObject(NewsEntry);

                var QueueGuidString = QueueGuid.ToString();

                var HRCreateRequest = Helper.BuildHRWorkItemRequest(EditorialModules.News,
                    QueueGuidString, JsonData, configuration, null, HRRequestMode.Create);

                var GuidResult = Helper.GetHRWorkItem((WorkItemRequest)HRCreateRequest, HRtoken, configuration);


                if (GuidResult.Value.workItemGuid == null)
                {
                    return null;
                }

                GuidToSet = new Guid(GuidResult.Value.workItemGuid);

                if (MappingEntry == null) // No Entry in HR WorkItemGuid table, insert one
                {
                    var newDataMap = new HRWorkItemDataMap
                    {
                        WorkUnitTypeID = 5, // Module type 
                                            /*
                                            3	Investigation
                                            4	Alerts
                                            5	News Queue
                                            6	BWQ
                                            */
                                            // Row ID in Module table, in this case id column of NewsFeed..FeedItemQueue
                        ModuleTableEntryID = postData.ModuleTableEntryID,

                        WorkItemID = GuidToSet, //HR WorkItem GUID

                        UpdatedBy = postData.Appuserid.ToString(),
                        CreatedBy = postData.Appuserid.ToString(),
                        DateCreatedUTC = DateTime.UtcNow,
                        LastUpdatedUTC = DateTime.UtcNow
                    };

                    _context.HRWorkItemDataMap.Add(newDataMap);
                    _context.SaveChanges();
                }
            }

            return new { WorkItemGuid = GuidToSet };
        }

        public object GetNewsEntryByGuid(Guid guid)
        {
            var MappingEntry = _context.HRWorkItemDataMap.Where(t => t.WorkItemID == guid).FirstOrDefault();
            if (MappingEntry == null)
            {
                return null;
            }

            var FeedItemQueueEntry = _newsfeedcontext.FeedItemQueue.Where(t => t.id == MappingEntry.ModuleTableEntryID).FirstOrDefault();
            if (FeedItemQueueEntry == null)
            {
                return null;
            }

            var Feeder_WatchesEntry = _newsfeedcontext.Feeder_watches.Where(t => t.PkWatchID == FeedItemQueueEntry.fkWatchID).FirstOrDefault();

            if (Feeder_WatchesEntry == null)
            {
                return null;
            }

            var Feeder_FeedArtiklesEntry = _newsfeedcontext.Feeder_FeedArtikles.Where(t => t.pkArtikleID == FeedItemQueueEntry.fkItemID)
                .FirstOrDefault();
            if (Feeder_FeedArtiklesEntry == null)
            {
                return null;

            }

            var Feeder_FeedsEntry = _newsfeedcontext.Feeder_Feeds.Where(t => t.pkFeedID == Feeder_FeedArtiklesEntry.fkFeedID).FirstOrDefault();

            var NewsLockEntry = _newsfeedcontext.FeedItemQueueLocks.Where(t => t.fkItemID == FeedItemQueueEntry.id).FirstOrDefault();

            AppUser LockedToUser = null;

            if (NewsLockEntry != null)
            {
                LockedToUser = new AppUser();
                LockedToUser = _context.AppUser
                    .Where(t => t.AppUserID == NewsLockEntry.LockedByRecipientID)
                    .FirstOrDefault();
            }

            var result = new { FeedItemQueue = FeedItemQueueEntry,
                Watch = Feeder_WatchesEntry,
                Article = Feeder_FeedArtiklesEntry,
                Feed = Feeder_FeedsEntry,
                LockedTo = LockedToUser
            };

            return result;
        }

        public NewsData SearchNewsQueueEntryById(int newsqentryid, IConfiguration configuration)
        {
            string dateperiod = configuration.GetSection("EditorialSettings:NewsDatePeriod").Value;

            NewsData result = _context.NewsData
                .FromSql("usp_GetNewsEntries_sel @watchID=0, @dateperiod={0}, @countryID={1}, @state={2}, @articleID={3} ", dateperiod, 0, 0, newsqentryid)
                .Select(pg => new NewsData
                {
                    Id = pg.Id,
                    FkItemID = pg.FkItemID,
                    FkWatchID = pg.FkWatchID,
                    FkCountryID = pg.FkCountryID,
                    ItemType = pg.ItemType,
                    State = pg.State,
                    DateAdded = pg.DateAdded,
                    WatchName = pg.WatchName,
                    ArticleID = pg.ArticleID,
                    ArticleTitle = pg.ArticleTitle,
                    ArticleDescription = pg.ArticleDescription,
                    ArticleURL = pg.ArticleURL,
                    FeedID = pg.FeedID,
                    FeedName = pg.FeedName,
                    FeedURL = pg.FeedURL,
                    LockedTo = pg.LockedTo
                }).FirstOrDefault();

            return result;
        }

        public LockEntry LockNewsItem(LockEntry lockentry)
        {
            var NewsLockEntry = _newsfeedcontext.FeedItemQueueLocks.Where(t => t.fkItemID == lockentry.IDFromWorkUnitsDBTable).FirstOrDefault();

            if (NewsLockEntry == null)
            {
                var MaxID = _newsfeedcontext.FeedItemQueueLocks.Max(x => x.ID);

                FeedItemQueueLocks newLock = new FeedItemQueueLocks
                {
                    ID = MaxID + 1,
                    LockedByRecipientID = lockentry.AppUserID,
                    DateTimeItemWasLocked = DateTime.UtcNow,
                    fkItemID = lockentry.IDFromWorkUnitsDBTable
                };

                _newsfeedcontext.FeedItemQueueLocks.Add(newLock);

                _newsfeedcontext.SaveChanges();

                return lockentry;
            }
            return null;
        }

        public LockEntry UnLockNewsItem(LockEntry lockentry)
        {
            var NewsLockEntry = _newsfeedcontext.FeedItemQueueLocks.Where(t => t.fkItemID == lockentry.IDFromWorkUnitsDBTable).FirstOrDefault();
            var AppUserId = lockentry.AppUserID;

            if (NewsLockEntry != null)
            {
                if (AppUserId == NewsLockEntry.LockedByRecipientID)
                {
                    _newsfeedcontext.FeedItemQueueLocks.Remove(NewsLockEntry);
                    _newsfeedcontext.SaveChanges();

                    return lockentry;
                }
            }
            return null;
        }

        private bool ValidateNewsData(WorkItemPostData postData, IConfiguration configuration)
        {

            var HRToken = new JwtSecurityToken(postData.Token);

            if (Helper.TokenValid(HRToken) == false)
            {
                return false;
            }

            if (postData.ModuleTableEntryID == 0)
            {
                return false;
            }

            // Check if HR is up before calling HR routines
            var hrResponse = Helper.GetHRServerStatus(configuration);
            // We expect a 400 - Bad Request, if 404 Not Found, return an error
            if (hrResponse.StatusCode == 404)
            {
                return false;
            }

            return true;
        }
    }
}

using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using LNWCOE.Models.Context;
using LNWCOE.Models.HR;
using LNWCOE.Models.News;
using LNWCOE.Module.News.Interface;
using LNWCOE.Service.Helpers;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Repository.DataAccess;

namespace LNWCOE.Module.News.Implementation
{
    public class FeedItemQueueRepository : Repository<FeedItemQueue>, IFeedItemQueueRepository
    {
        private  readonly NewsFeedDataContext _newsfeedcontext;
        private new readonly EditorialDataContext _context;

        public FeedItemQueueRepository(NewsFeedDataContext newsfeedcontext, EditorialDataContext context) : base(context)
        {
            _newsfeedcontext = newsfeedcontext;
            _context = context;
        }

        /// <summary>
        /// Updates the status for a news Entity entry
        /// this routine also updates the WorkItem record in Human Review
        /// </summary>
        /// <param name="newsdata"></param>
        /// <param name="configuration"></param>
        /// <returns></returns>
        public object UpdateNewsEntity(NewsDataSave newsdata, IConfiguration configuration)
        {
            bool DataValid = ValidateNewsEntityData(newsdata, configuration);
            if (DataValid == false)
            {
                return null;
            }

            string HRtoken = newsdata.HRToken;
            FeedItemQueue FeedItemQueueObject = newsdata.FeedItemQueue;
            System.Guid WorkItemGuid = newsdata.WorkItemGuid;

            /*
            3	Investigation
            4	Alerts
            5	News Queue
            6	BWQ
            */
            var MappingEntry = _context.HRWorkItemDataMap.Where(t => t.WorkItemID == WorkItemGuid && t.WorkUnitTypeID == 5) // 5 = News Queue
               .FirstOrDefault();
            if (MappingEntry == null)
            {
                return null;
            }

            var FeedItemQueueEntry = _newsfeedcontext.FeedItemQueue.Where(t => t.id == FeedItemQueueObject.id).FirstOrDefault();
            // Check if entry exists
            if (FeedItemQueueEntry == null)
            {
                return null;
            }
            // Check the state, it should only be NULL or 0
            if (!(FeedItemQueueEntry.state == null || FeedItemQueueEntry.state == 0))
            {
                return null;
            }



            var AppUserId = FeedItemQueueEntry.stateChangedRecipient; 
            // the user that sent this update request, according to the newsfeed entry table [FeedItemQueue]

            //Check locks 
            var NewsLockEntry = _newsfeedcontext.FeedItemQueueLocks
               //.Where(t => t.fkItemID == FeedItemQueueObject.id && t.LockedByRecipientID == AppUserId).FirstOrDefault();
               .Where(t => t.fkItemID == FeedItemQueueObject.id).FirstOrDefault();

            if (NewsLockEntry != null) // lock exists
            {
                var AppUser = _context.AppUser.Where(u => u.AppUserID == AppUserId).FirstOrDefault();

                if (NewsLockEntry.LockedByRecipientID == AppUserId) // entry is locked to this user
                {
                    // locked to current user, remove the lock
                    _newsfeedcontext.FeedItemQueueLocks.Remove(NewsLockEntry);
                }
                else // locked to someone else
                {
                    return null;
                }
            }

            // Update News if everything looks ok
            _newsfeedcontext.Entry(FeedItemQueueEntry).CurrentValues.SetValues(FeedItemQueueObject);
            _newsfeedcontext.SaveChanges();

            // Human Review routines
            var QueueGuid = (from module in _context.ApplicationModules
                             where module.ModuleName == EditorialModules.News
                             select module.QueueGuid).FirstOrDefault();

            var QueueGuidString = QueueGuid.ToString();
            var JsonData = JsonConvert.SerializeObject(FeedItemQueueObject);

            var HRCreateRequest = Helper.BuildHRWorkItemRequest(EditorialModules.News,
                   QueueGuidString, JsonData,
                   configuration, WorkItemGuid.ToString(), HRRequestMode.Update);

            var GuidResult = Helper.PutHRWorkItem((WorkItemPutRequest)HRCreateRequest, HRtoken, configuration);

            return FeedItemQueueObject;
        }

        private bool ValidateNewsEntityData(NewsDataSave newsdata, IConfiguration configuration)
        {
            var HRToken = new JwtSecurityToken(newsdata.HRToken);

            if (Helper.TokenValid(HRToken) == false)
            {
                return false;
            }

            if (newsdata.FeedItemQueue == null || newsdata.WorkItemGuid == null)
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

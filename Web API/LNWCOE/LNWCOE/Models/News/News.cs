using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.News
{
    public class News
    {
    }

    public class NewsDataSave
    {
        public FeedItemQueue FeedItemQueue { get; set; }
        public string HRToken { get; set; }
        public Guid WorkItemGuid { get; set; }
    }


    public class Feeder_FeedArtikles
    {
        [Key]
        public int pkArtikleID { get; set; }
        public string URL { get; set; }
        public string Title { get; set; }
        public string ArtikleDescription { get; set; }
        public int fkFeedID { get; set; }
        public DateTime? DateAdded { get; set; }
        public byte[] UniqKey { get; set; }
        public byte[] UniqContent { get; set; }
        public byte[] UniqTitle { get; set; }
    }

    public class Feeder_Feeds
    {
        [Key]
        public int pkFeedID { get; set; }
        public string FeedName { get; set; }
        public string FeedURL { get; set; }
        public bool? Active { get; set; }
        public int? fkLanguageID { get; set; }
        public int? fkCountryID { get; set; }
        public string City { get; set; }
        public int? fkAddedBy { get; set; }
        public int? fkUpdatedBy { get; set; }
        public DateTime? DateAdded { get; set; }
        public DateTime? DateUpdated { get; set; }
        public int? fkWorkerID { get; set; }
        public int? CurrentState { get; set; }
        public DateTime? NextRunTime { get; set; }
    }

    public class FeedItemQueueLocks
    {
        public int ID { get; set; }
        public int LockedByRecipientID { get; set; }
        public int fkItemID { get; set; }
        public DateTime DateTimeItemWasLocked { get; set; }
    }



    public class NewsJobsNav
    {
        [Key]
        public int WatchID { get; set; }
        public string Caption { get; set; }
        public string CountryName { get; set; }
        public int CountryID { get; set; }
        public int LanguageID { get; set; }
        public string LanguageName { get; set; }
    }

    public class NewsFilter
    {
        public int WatchID { get; set; }
        public int CountryID { get; set; }
        public int State { get; set; }
        public int AppUserID { get; set; }
    }

    public class NewsData
    {
        public int id { get; set; }
        public int fkItemID { get; set; }
        public int fkWatchID { get; set; }
        public int fkCountryID { get; set; }
        public int itemType { get; set; }
        public int State { get; set; }
        public DateTime? dateAdded { get; set; }
        public string WatchName { get; set; }
        public int ArticleID { get; set; }
        public string ArticleTitle { get; set; }
        public string ArticleDescription { get; set; }
        public string ArticleURL { get; set; }
        public int FeedID { get; set; }
        public string FeedName { get; set; }
        public string FeedURL { get; set; }
        public string LockedTo { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Text;

namespace LNWCOE.Models.News
{
    public class NewsData
    {
        public int? Id { get; set; }
        public int? FkItemID { get; set; }
        public int? FkWatchID { get; set; }
        public int? FkCountryID { get; set; }
        public int? ItemType { get; set; }
        public int? State { get; set; }
        public DateTime? DateAdded { get; set; }
        public string WatchName { get; set; }
        public int? ArticleID { get; set; }
        public string ArticleTitle { get; set; }
        public string ArticleDescription { get; set; }
        public string ArticleURL { get; set; }
        public int? FeedID { get; set; }
        public string FeedName { get; set; }
        public string FeedURL { get; set; }
        public string LockedTo { get; set; }
    }
}

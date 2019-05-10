using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.News
{
    public class Feeder_WatchKeywords
    {
        [Key]
        public int pkKeywordID { get; set; }
        public string Keyword { get; set; }
        public int fkWatchID { get; set; }
        public string EngTran { get; set; }
        public DateTime? DateAdded { get; set; }
    }
}

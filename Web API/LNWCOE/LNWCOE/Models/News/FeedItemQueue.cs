using System;
using System.ComponentModel.DataAnnotations;
namespace LNWCOE.Models.News
{
    public class FeedItemQueue
    {
        [Key]
        public int id { get; set; }
        public int fkItemID { get; set; }
        public int? fkWatchID { get; set; }
        public int? fkCountryID { get; set; }
        public int? itemType { get; set; }
        public int? state { get; set; }
        public DateTime? stateChanged { get; set; }
        public DateTime? dateAdded { get; set; }
        public int? stateChangedRecipient { get; set; }
    }
}

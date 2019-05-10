using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.News
{
    [DataContract]
    [Serializable]
    public class FeedItemQueue
    {
        [Key]
        [DataMember]
        public int id { get; set; }
        [DataMember]
        public int fkItemID { get; set; }
        [DataMember]
        public int? fkWatchID { get; set; }
        [DataMember]
        public int? fkCountryID { get; set; }
        [DataMember]
        public int? itemType { get; set; }
        [DataMember]
        public int? state { get; set; }
        [DataMember]
        public DateTime? stateChanged { get; set; }
        [DataMember]
        public DateTime? dateAdded { get; set; }
        [DataMember]
        public int? stateChangedRecipient { get; set; }
    }
}

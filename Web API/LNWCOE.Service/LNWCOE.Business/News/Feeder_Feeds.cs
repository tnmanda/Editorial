using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.News
{
    [DataContract]
    [Serializable]
    public class Feeder_Feeds
    {
        [Key]
        [DataMember]
        public int pkFeedID { get; set; }
        [DataMember]
        public string FeedName { get; set; }
        [DataMember]
        public string FeedURL { get; set; }
        [DataMember]
        public bool? Active { get; set; }
        [DataMember]
        public int? fkLanguageID { get; set; }
        [DataMember]
        public int? fkCountryID { get; set; }
        [DataMember]
        public string City { get; set; }
        [DataMember]
        public int? fkAddedBy { get; set; }
        [DataMember]
        public int? fkUpdatedBy { get; set; }
        [DataMember]
        public DateTime? DateAdded { get; set; }
        [DataMember]
        public DateTime? DateUpdated { get; set; }
        [DataMember]
        public int? fkWorkerID { get; set; }
        [DataMember]
        public int? CurrentState { get; set; }
        [DataMember]
        public DateTime? NextRunTime { get; set; }
    }
}

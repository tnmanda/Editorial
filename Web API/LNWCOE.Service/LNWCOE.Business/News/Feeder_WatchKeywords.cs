using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.News
{
    [DataContract]
    [Serializable]
    public class Feeder_WatchKeywords
    {
        [Key]
        [DataMember]
        public int pkKeywordID { get; set; }
        [DataMember]
        public string Keyword { get; set; }
        [DataMember]
        public int fkWatchID { get; set; }
        [DataMember]
        public string EngTran { get; set; }
        [DataMember]
        public DateTime? DateAdded { get; set; }
    }
}

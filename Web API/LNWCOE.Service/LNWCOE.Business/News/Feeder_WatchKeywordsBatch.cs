using System;
using System.Runtime.Serialization;

namespace LNWCOE.Models.News
{
    [DataContract]
    [Serializable]
    public class Feeder_WatchKeywordsBatch
    {
        [DataMember]
        public string KeywordsSeparator { get; set; }
        [DataMember]
        public string Keywords { get; set; }
        [DataMember]
        public int fkWatchID { get; set; }
        [DataMember]
        public DateTime DateAdded { get; set;  }
    }
}

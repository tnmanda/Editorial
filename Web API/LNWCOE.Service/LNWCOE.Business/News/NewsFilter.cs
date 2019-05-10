using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.News
{
    [DataContract]
    [Serializable]
    public class NewsFilter
    {
        [DataMember]
        public int WatchID { get; set; }
        [DataMember]
        public int CountryID { get; set; }
        [DataMember]
        public int LanguageID { get; set; }
        [DataMember]
        public int State { get; set; }
        [DataMember]
        public int AppUserID { get; set; }
    }
}

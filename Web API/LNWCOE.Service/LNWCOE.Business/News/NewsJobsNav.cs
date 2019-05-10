using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.News
{
    [DataContract]
    [Serializable]
    public class NewsJobsNav
    {
        [Key]
        [DataMember]
        public int? WatchID { get; set; }
        [DataMember]
        public string Caption { get; set; }
        [DataMember]
        public string CountryName { get; set; }
        [DataMember]
        public int? CountryID { get; set; }
        [DataMember]
        public int? LanguageID { get; set; }
        [DataMember]
        public string LanguageName { get; set; }
    }
}

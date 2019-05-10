using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using LNWCOE.Models.Admin;

namespace LNWCOE.Models.News
{
    [DataContract]
    [Serializable]
    public class Feeder_watches
    {
        [Key]
        [DataMember]
        public int PkWatchID { get; set; }
        [DataMember]
        public string Caption { get; set; }
        [DataMember]
        public string Description { get; set; }
        [DataMember]
        public bool? InArtikleTitle { get; set; }
        [DataMember]
        public bool? InArtikleDescription { get; set; }
        [DataMember]
        public bool? WholeWords { get; set; }
        [DataMember]
        public bool? MAtchAllKeywords { get; set; }
        [DataMember]
        public int? FkLanguageID { get; set; }
        [DataMember]
        public string Comments { get; set; }
        [DataMember]
        public DateTime? LastFilterDate { get; set; }
    }
}

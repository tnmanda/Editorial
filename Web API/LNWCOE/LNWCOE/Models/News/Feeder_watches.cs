using System;
using System.ComponentModel.DataAnnotations;
using LNWCOE.Models.Admin;

namespace LNWCOE.Models.News
{
    public class Feeder_watches
    {
        [Key]
        public int pkWatchID { get; set; }
        public string Caption { get; set; }
        public string Description { get; set; }
        public bool? InArtikleTitle { get; set; }
        public bool? InArtikleDescription { get; set; }
        public bool? WholeWords { get; set; }
        public bool? MAtchAllKeywords { get; set; }
        public int? fkLanguageID { get; set; }
        public string Comments { get; set; }
        public DateTime? LastFilterDate { get; set; }
    }

}

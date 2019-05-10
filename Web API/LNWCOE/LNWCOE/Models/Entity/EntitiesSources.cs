using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Entity
{
    public class EntitiesSources
    {
        [Key]
        public int SourceID { get; set; }
        public string Country { get; set; }
        public string SourceName { get; set; }
        public string SourceAbbrev { get; set; }
        public string AssignedTo { get; set; }
        public bool? Started { get; set; }
        public DateTime? LastChecked { get; set; }
        public DateTime? LastUpdated { get; set; }
        public bool? ArticlesBased { get; set; }
        public string Comments { get; set; }
        public string Coverage { get; set; }
        public bool IsRealSource { get; set; }
        public bool ShowOnList { get; set; }
        public bool IsSpecialCollection { get; set; }
        public bool AutoSelectOnFilter { get; set; }
        public short? fkSourceCategoryID { get; set; }
        public short? fkCountryID { get; set; }
        public bool? IsRedundantSource { get; set; }
        public string Frequency { get; set; }
        public bool? AccuitySource { get; set; }
        public int? fkTeamID { get; set; }
        public bool? SourceCovered { get; set; }
        public short? Reason { get; set; }
        public int? LastReviewedBy { get; set; }
        public DateTime? LastReviewedDate { get; set; }
    }

}

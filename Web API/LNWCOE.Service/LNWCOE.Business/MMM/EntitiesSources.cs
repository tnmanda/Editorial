using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.MMM
{
    [DataContract]
    [Serializable]
    public class EntitiesSources
    {
        [Key]
        [DataMember]
        public int SourceID { get; set; }
        [DataMember]
        public string Country { get; set; }
        [DataMember]
        public string SourceName { get; set; }
        [DataMember]
        public string SourceAbbrev { get; set; }
        [DataMember]
        public string AssignedTo { get; set; }
        [DataMember]
        public bool? Started { get; set; }
        [DataMember]
        public DateTime? LastChecked { get; set; }
        [DataMember]
        public DateTime? LastUpdated { get; set; }
        [DataMember]
        public bool? ArticlesBased { get; set; }
        [DataMember]
        public string Comments { get; set; }
        [DataMember]
        public string Coverage { get; set; }
        [DataMember]
        public bool IsRealSource { get; set; }
        [DataMember]
        public bool ShowOnList { get; set; }
        [DataMember]
        public bool IsSpecialCollection { get; set; }
        [DataMember]
        public bool AutoSelectOnFilter { get; set; }
        [DataMember]
        public short? fkSourceCategoryID { get; set; }
        [DataMember]
        public short? fkCountryID { get; set; }
        [DataMember]
        public bool? IsRedundantSource { get; set; }
        [DataMember]
        public string Frequency { get; set; }
        [DataMember]
        public bool? AccuitySource { get; set; }
        [DataMember]
        public int? fkTeamID { get; set; }
        [DataMember]
        public bool? SourceCovered { get; set; }
        [DataMember]
        public short? Reason { get; set; }
        [DataMember]
        public int? LastReviewedBy { get; set; }
        [DataMember]
        public DateTime? LastReviewedDate { get; set; }
    }
}

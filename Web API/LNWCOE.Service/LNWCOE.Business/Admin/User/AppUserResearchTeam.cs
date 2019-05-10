using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.Admin
{
    [DataContract]
    [Serializable]
    public class AppUserResearchTeam
    {
        [Key]
        [DataMember]
        public int AppUserResearchTeamID { get; set; }
        [DataMember]
        public int? WorkUnitTypeID { get; set; }
        [DataMember]
        public int? LeadUserID { get; set; }
        [DataMember]
        public int? CountryID { get; set; }
        [DataMember]
        public int? LanguageTypeID { get; set; }
        [DataMember]
        public int? OfficeID { get; set; }
        [DataMember]
        public int? TeamID { get; set; }
        [DataMember]
        public string CreatedBy { get; set; }
        [DataMember]
        public DateTime DateCreatedUTC { get; set; }
        [DataMember]
        public string UpdatedBy { get; set; }
        [DataMember]
        public DateTime LastUpdatedUTC { get; set; }

        [DataMember]
        public Country Country { get; set; }
        [DataMember]
        public LanguageType LanguageType { get; set; }
        [DataMember]
        public Office Office { get; set; }
        [DataMember]
        public Team Team { get; set; }
        [DataMember]
        public AppUser LeadUser { get; set; }

        [DataMember]
        public WorkUnitType WorkUnitType { get; set; }
        
    }
}

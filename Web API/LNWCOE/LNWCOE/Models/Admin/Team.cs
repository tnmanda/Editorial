using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LNWCOE.Models.Admin
{
    public class Team
    {
        [Key]
        public int TeamID { get; set; }
        public string TeamName { get; set; }
        public bool? IsActive { get; set; }
        public string Comments { get; set; }
        public bool? IsAlertsCoverage { get; set; }
        public bool? IsNewsCoverage { get; set; }
        public int? OfficeID { get; set; }
        public int? LanguageTypeID { get; set; }
        public int? LeadUserID { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }

        public Office Office { get; set; }
        public LanguageType LanguageType { get; set; }
        [ForeignKey("LeadUserID")]
        public AppUser LeadUser { get; set; }

    }
}

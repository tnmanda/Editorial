using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Admin
{
    public class AppUserResearchTeam
    {
        [Key]
        public int AppUserResearchTeamID { get; set; }
        public int? WorkUnitTypeID { get; set; }
        public int? LeadUserID { get; set; }
        public int? CountryID { get; set; }
        public int? LanguageTypeID { get; set; }
        public int? OfficeID { get; set; }
        public int? TeamID { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }
    }
}

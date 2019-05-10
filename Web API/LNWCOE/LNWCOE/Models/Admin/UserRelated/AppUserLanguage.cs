using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Admin
{
    public class AppUserLanguage
    {
        [Key]
        public int AppUserLanguageID { get; set; }
        public int? LanguageTypeID { get; set; }
        public int? AppUserID { get; set; }
        public int? ProficiencyTypeID { get; set; }
        public bool IsMonitored { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }

        public LanguageType LanguageType { get; set; }
        public ProficiencyType ProficiencyType { get; set; }
    }
}

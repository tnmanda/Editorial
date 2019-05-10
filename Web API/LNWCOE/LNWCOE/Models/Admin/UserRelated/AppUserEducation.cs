using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Admin
{
    public class AppUserEducation
    {
        [Key]
        public int AppUserEducationID { get; set; }
        public int AppUserID { get; set; }
        public int EducationTypeID { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }

        public EducationType EducationType { get; set; }
    }
}

using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LNWCOE.Models.Admin
{
    public class Office
    {
        [Key]
        public int OfficeID { get; set; }
        public string OfficeName { get; set; }
        public int? CountryID { get; set; }
        public string Company { get; set; }
        public string City { get; set; }
        public bool? IsSales { get; set; }
        public bool? IsResearch { get; set; }
        public bool? IsMarketing { get; set; }
        public bool? IsSupport { get; set; }
        public bool IsActive { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }

        public Country Country { get; set; }
        //public virtual Country Country { get; set; }
    }
}

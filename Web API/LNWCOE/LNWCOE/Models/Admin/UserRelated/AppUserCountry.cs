using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Admin
{
    public class AppUserCountry
    {
        [Key]
        public int AppUserCountryID { get; set; }
        public int AppUserID { get; set; }
        public int CountryID { get; set; }
        public bool IsLocked { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }

        public Country Country { get; set; }
    }
}

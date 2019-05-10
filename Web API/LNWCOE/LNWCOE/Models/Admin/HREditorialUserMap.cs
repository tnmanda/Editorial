using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Admin
{
    public class HREditorialUserMap
    {
        [Key]
        public int HREditorialUserMapID { get; set; }
        public int AppUserID { get; set; }
        public string HumanReviewUserID { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }

        public AppUser AppUser { get; set; }
    }

}

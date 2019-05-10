using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.INV
{
    public class ActivityType
    {
        [Key]
        public int ActivityTypeID { get; set; }
        public string ActivityTypeName { get; set; }
        public string ActivityTypeDescription { get; set; }
        public bool IsInList { get; set; }
        public bool IsActive { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }
    }
}

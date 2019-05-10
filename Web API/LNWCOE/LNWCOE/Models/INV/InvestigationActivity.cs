using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.INV
{
    public class InvestigationActivity
    {
        [Key]
        public int InvestigationActivityID { get; set; }
        public int InvestigationID { get; set; }
        public int ActivityTypeID { get; set; }
        public int AppUserID { get; set; }
        public string FromValue { get; set; }
        public string ToValue { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }
    }
}

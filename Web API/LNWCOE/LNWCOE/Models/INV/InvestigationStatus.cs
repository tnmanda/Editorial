using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.INV
{
    public class InvestigationStatus
    {
        [Key]
        public int InvestigationStatusID { get; set; }
        public string InvestigationStatusName { get; set; }
        public string InvestigationStatusDescription { get; set; }
        public bool IsDefault { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }
    }
}

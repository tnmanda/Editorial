using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Admin
{
    public class AppUserEmploymentRecord
    {
        [Key]
        public int AppUserEmploymentRecordID { get; set; }
        public int AppUserID { get; set; }
        public DateTime? StartDateUTC { get; set; }
        public DateTime? EndDateUTC { get; set; }
        public int? ContractTypeID { get; set; }
        public DateTime? DepartureDateUTC { get; set; }
        public int? DepartureTypeID { get; set; }
        public bool IsEligibleRehire { get; set; }
        public DateTime? MovedToProductionUTC { get; set; }
        public bool IsReplaced { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }

        public DepartureType DepartureType { get; set; }
        public ContractType ContractType { get; set; } 
    }
}

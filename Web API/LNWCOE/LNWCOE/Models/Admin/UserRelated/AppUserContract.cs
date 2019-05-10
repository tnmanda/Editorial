using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Admin
{
    public class AppUserContract
    {
        [Key]
        public int AppUserContractID { get; set; }
        public int AppUserID { get; set; }
        public DateTime? TerminationDateUTC { get; set; }
        public DateTime? MovedToProductionUTC { get; set; }
        public DateTime StartDateUTC { get; set; }
        public int ContractTypeID { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }

        public ContractType ContractType { get; set; }

    }
}

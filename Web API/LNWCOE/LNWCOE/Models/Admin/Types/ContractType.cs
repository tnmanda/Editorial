using System;
using System.ComponentModel.DataAnnotations;
namespace LNWCOE.Models.Admin
{
    public class ContractType
    {
        [Key]
        public int ContractTypeID { get; set; }
        public string ContractTypeName { get; set; }
        public string ContractTypeDescr { get; set; }
        public bool IsInList { get; set; }
        public bool IsActive { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }
    }
}

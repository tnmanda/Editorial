using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Admin
{
    public class ProficiencyType
    {
        [Key]
        public int ProficiencyTypeID { get; set; }
        public string ProficiencyTypeName { get; set; }
        public string ProficiencyTypeDesc { get; set; }
        public bool IsInList { get; set; }
        public bool IsActive { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }
    }
}

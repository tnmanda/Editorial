using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Admin
{
    public class FunctionType
    {
        [Key]
        public int FunctionTypeID { get; set; }
        public string FunctionTypeName { get; set; }
        public string FunctionTypeDesc { get; set; }
        public bool IsInList { get; set; }
        public bool IsActive { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }
    }
}

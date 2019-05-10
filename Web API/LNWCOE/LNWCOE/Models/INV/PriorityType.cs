using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.INV
{
    public class PriorityType
    {
        [Key]
        public int PriorityTypeID { get; set; }
        public string PriorityName { get; set; }
        public string PriorityDescription { get; set; }
        public int PriorityWeight { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }
    }
}

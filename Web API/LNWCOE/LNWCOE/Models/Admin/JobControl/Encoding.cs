using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Admin
{
    public class Encoding
    {
        [Key]
        public int EncodingID { get; set; }
        public string EncodingName { get; set; }
        public string Description { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsHighPriority { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }
    }
}

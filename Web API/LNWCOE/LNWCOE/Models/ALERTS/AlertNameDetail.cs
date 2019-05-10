using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.ALERTS
{
    public class AlertNameDetail
    {
        [Key]
        public int AlertNameDetailID { get; set; }
        public int AlertNameID { get; set; }
        public string ExternalIdentifier { get; set; }
        public string NameDetail { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }
    }
}

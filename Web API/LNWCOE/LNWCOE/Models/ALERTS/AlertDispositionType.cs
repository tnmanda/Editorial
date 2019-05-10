using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.ALERTS
{
    public class AlertDispositionType
    {
        [Key]
        public int AlertDispositionTypeID { get; set; }
        public int? AlertDispositionTypeDef { get; set; }
        public string Name { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }
    }

}

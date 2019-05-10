using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Admin
{
    public class AlertScheduleType
    {
        public int AlertScheduleTypeID { get; set; }
        public string AlertScheduleTypeName { get; set; }
        public string IncrementType { get; set; }
        public int IncrementValue { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }
    }
}

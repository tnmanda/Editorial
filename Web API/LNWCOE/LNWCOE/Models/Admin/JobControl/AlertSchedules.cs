using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Admin
{
    public class AlertSchedules
    {
        [Key]
        public int AlertSchedulesId { get; set; }
        public int AlertJobsID { get; set; }
        public bool IsActive { get; set; }
        public int AlertScheduleTypeID { get; set; }
        public DateTime NextRunTime { get; set; }
        public string IsRunNow { get; set; }
        public int JobStatus { get; set; }
        public int? AlertWorkersID { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }
    }
}
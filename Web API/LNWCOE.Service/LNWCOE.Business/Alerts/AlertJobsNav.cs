using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Alerts
{
    public class AlertJobsNav
    {
        [Key]
        public int AlertJobsQueueID { get; set; }
        public string Job { get; set; }
        public DateTime Due { get; set; }
    }
}

using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Alerts
{
    public class AlertJobData
    {
        [Key]
        public int AlertJobsQueueID { get; set; }
        public string Description { get; set; }
        public string JobName { get; set; }
        public string JobURL { get; set; }
        public string Status { get; set; }
        public DateTime Created { get; set; }
        public DateTime Due { get; set; }
        public string Priority { get; set; }
        public int Total { get; set; }
        public int Remaining { get; set; }
    }
}

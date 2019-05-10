using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Alerts
{
    public class AlertJobFilterData
    {
        [Key]
        public int AlertJobsQueueID { get; set; }
        public string Job { get; set; }
        public string JobURL { get; set; }
        public DateTime Due { get; set; }
        public string Alert { get; set; }
        public string AlertDescription { get; set; }
        public DateTime Created { get; set; }
        public int AlertJobEntityID { get; set; }
        public Guid? WorkItemID { get; set; }
        public string Status { get; set; }
        public string Locked { get; set; }

    }
}

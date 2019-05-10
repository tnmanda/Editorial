using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Alerts
{
    public class AlertJobsQueueData
    {
        [Key]
        public AlertJobsQueue AlertJobsQueue { get; set; }
        public List<AlertNames> AlertNames { get; set; }
        public string HRToken { get; set; }
    }
}

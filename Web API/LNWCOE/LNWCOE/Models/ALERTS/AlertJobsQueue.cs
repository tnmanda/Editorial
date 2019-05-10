using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.ALERTS
{
    public class AlertJobsQueue
    {
        [Key]
        public int AlertJobsQueueID { get; set; }
        public int AlertJobsID { get; set; }
        public int StatusCollectionItemID { get; set; }
        public int PriorityCollectionItemID { get; set; }
        public DateTime DueDateUTC { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string CreatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }
        public string UpdatedBy { get; set; }
    }

    public class AlertJobsQueueData
    {
        [Key]
        public AlertJobsQueue AlertJobsQueue { get; set; }
        public List<AlertNames> AlertNames { get; set; }
        public string HRToken { get; set; }
    }
}

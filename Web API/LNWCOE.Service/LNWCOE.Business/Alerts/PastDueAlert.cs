using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Alerts
{
    public class PastDueAlert
    {
        [Key]
        public int AlertJobQueueID { get; set; }
        public int JobId { get; set; }
        public string JobName { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime DateCreated { get; set; }
        public string Source { get; set; }
    }
}

using System;
using System.ComponentModel.DataAnnotations;
using LNWCOE.Models.Admin;

namespace LNWCOE.Models.ALERTS
{
    public class AlertJobsQueueEntity
    {
        [Key]
        public int AlertJobsQueueEntityID { get; set; }
        public int AlertJobsQueueID { get; set; }
        public int AlertNameID { get; set; }
        public int StatusID { get; set; }
        public Guid? WorkItemID { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string CreatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }
        public string UpdatedBy { get; set; }
    }


    public class AlertJobsQueueEntityData
    {
        public AlertJobsQueueEntity AlertJobsQueueEntity { get; set; }
        public AlertNames AlertNames { get; set; }
        public AlertJobs AlertJobs { get; set; }
        public AppUser LockedTo { get; set; }
    }


    public class AlertJobsQueueEntityDataSave
    {
        public AlertJobsQueueEntity AlertJobsQueueEntity { get; set; }
        public string HRToken { get; set; }
    }
}

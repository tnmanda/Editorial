using LNWCOE.Models.Admin;

namespace LNWCOE.Models.Alerts
{
    public class AlertJobsQueueEntityData
    {
        public AlertJobsQueueEntity AlertJobsQueueEntity { get; set; }
        public AlertNames AlertNames { get; set; }
        public AlertJobs AlertJobs { get; set; }
        public AppUser LockedTo { get; set; }
    }
}

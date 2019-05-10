using System;
using System.ComponentModel.DataAnnotations;
using LNWCOE.Models.Admin;

namespace LNWCOE.Models.ALERTS
{
    public class AlertJobs
    {
        [Key]
        public int AlertJobsID { get; set; }
        public string JobName { get; set; }
        public string JobAbbrev { get; set; }
        public string JobDescription { get; set; }
        public string JobURL { get; set; }
        public bool IsActive { get; set; }
        public string JobSpecialInstructions { get; set; }
        public string JobComments { get; set; }
        public int? AlertSourceTypeID { get; set; }
        public int? CountryID { get; set; }
        public string JobScrapperClassName { get; set; }
        public string JobScrapperAssemble { get; set; }
        public bool? IsWithLookUpID { get; set; }
        public string TableNameSource { get; set; }
        public bool? IsShowOnDynamicDisplay { get; set; }
        public string Regex { get; set; }
        public string RegexForPages { get; set; }
        public string Encoding { get; set; }
        public bool? IsPreventDeletions { get; set; }
        public bool? IsUserTermsFilter { get; set; }
        public bool? IsSendNoUpdate { get; set; }
        public int? TeamID { get; set; }
        public byte? PriorityCode { get; set; }
        public bool? IsUseProxy { get; set; }
        public bool? IsCriticalJob { get; set; }
        public int? ResultType { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? LastUpdatedUTC { get; set; }

        public Country Country { get; set; }
    }

    public class AlertJobsNav
    {
        [Key]
        public int AlertJobsQueueID { get; set; }
        public string Job { get; set; }
        public DateTime Due { get; set; }
        // public string Alert { get; set; }
        // public string AlertDescription { get; set; }
    }
    public class AlertJobData
    {
        [Key]
        public int AlertJobsQueueID { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public DateTime Created { get; set; }
        public DateTime Due { get; set; }
        public string Priority { get; set; }
        public int Total { get; set; }
        public int Remaining { get; set; }
    }

    public class AlertJobFilter
    {
        [Key]
        public int AlertJobQueueID { get; set; }
        public string DueDate { get; set; }
        // public int CountryID { get; set; }
        // public int NameID { get; set; } // unused
        // public string EmailKey { get; set; }
    }
    public class AlertJobFilterData
    {
        [Key]
        public int AlertJobsQueueID { get; set; }
        public string Job { get; set; }
        public DateTime Due { get; set; }
        public string Alert { get; set; }
        public string AlertDescription { get; set; }
        public DateTime Created { get; set; }
        public int AlertJobEntityID { get; set; }
        public Guid? WorkItemID { get; set; }
        public string Status { get; set; }
        public string Locked { get; set; }

    }

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
using System;
using System.ComponentModel.DataAnnotations;
namespace LNWCOE.Models.ALERTS
{
    public class EmailPool
    {
        [Key]
        public int EmailPoolID { get; set; }
        public int? AlertJobsID { get; set; }
        public int? AppUserID { get; set; }
        public string TextBodyPart { get; set; }
        public string To { get; set; }
        public string Subject { get; set; }
        public short? Status { get; set; }
        public string Exception { get; set; }
        public string Source { get; set; }
        public bool? IsCompleted { get; set; }
        public bool? IsReportProblem { get; set; }
        public Guid? EmailKey { get; set; }
        public int? CompletedBy { get; set; }
        public DateTime? DateCompletedUTC { get; set; }
        public byte? PriorityCode { get; set; }
        public DateTime? DateSentUTC { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }
    }

}

using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.Alerts
{
    [DataContract]
    [Serializable]
    public class AlertSchedules
    {
        [Key]
        [DataMember]
        public int AlertSchedulesId { get; set; }
        [DataMember]
        public int AlertJobsID { get; set; }
        [DataMember]
        public bool IsActive { get; set; }
        [DataMember]
        public int AlertScheduleTypeID { get; set; }
        [DataMember]
        public DateTime NextRunTime { get; set; }
        [DataMember]
        public string IsRunNow { get; set; }
        [DataMember]
        public int JobStatus { get; set; }
        [DataMember]
        public int? AlertWorkersID { get; set; }
        [DataMember]
        public string CreatedBy { get; set; }
        [DataMember]
        public DateTime DateCreatedUTC { get; set; }
        [DataMember]
        public string UpdatedBy { get; set; }
        [DataMember]
        public DateTime LastUpdatedUTC { get; set; }
    }
}

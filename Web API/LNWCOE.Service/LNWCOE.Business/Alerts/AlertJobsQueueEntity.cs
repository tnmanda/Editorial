using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.Alerts
{
    [DataContract]
    [Serializable]
    public class AlertJobsQueueEntity
    {
        [Key]
        [DataMember]
        public int AlertJobsQueueEntityID { get; set; }
        [DataMember]
        public int AlertJobsQueueID { get; set; }
        [DataMember]
        public int AlertNameID { get; set; }
        [DataMember]
        public int StatusID { get; set; }
        [DataMember]
        public Guid? WorkItemID { get; set; }
        [DataMember]
        public DateTime DateCreatedUTC { get; set; }
        [DataMember]
        public string CreatedBy { get; set; }
        [DataMember]
        public DateTime LastUpdatedUTC { get; set; }
        [DataMember]
        public string UpdatedBy { get; set; }
    }
}

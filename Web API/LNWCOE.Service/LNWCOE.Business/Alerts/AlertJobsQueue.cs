using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.Alerts
{
    [DataContract]
    [Serializable]
    public class AlertJobsQueue
    {
        [Key]
        [DataMember]
        public int AlertJobsQueueID { get; set; }
        [DataMember]
        public int AlertJobsID { get; set; }
        [DataMember]
        public int StatusCollectionItemID { get; set; }
        [DataMember]
        public int PriorityCollectionItemID { get; set; }
        [DataMember]
        public DateTime DueDateUTC { get; set; }
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

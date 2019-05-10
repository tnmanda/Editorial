using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.Alerts
{
    [DataContract]
    [Serializable]
    public class AlertScheduleType
    {
        [Key]
        [DataMember]
        public int AlertScheduleTypeID { get; set; }
        [DataMember]
        public string AlertScheduleTypeName { get; set; }
        [DataMember]
        public string IncrementType { get; set; }
        [DataMember]
        public int IncrementValue { get; set; }
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

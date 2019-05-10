using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.Alerts
{
    [DataContract]
    [Serializable]
    public class Encoding
    {
        [Key]
        [DataMember]
        public int EncodingID { get; set; }
        [DataMember]
        public string EncodingName { get; set; }
        [DataMember]
        public string Description { get; set; }
        [DataMember]
        public bool? IsActive { get; set; }
        [DataMember]
        public bool? IsHighPriority { get; set; }
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

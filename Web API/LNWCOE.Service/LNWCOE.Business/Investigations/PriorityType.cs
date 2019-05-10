using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.Investigations
{
    [DataContract]
    [Serializable]
    public class PriorityType
    {
        [Key]
        [DataMember]
        public int PriorityTypeID { get; set; }
        [DataMember]
        public string PriorityName { get; set; }
        [DataMember]
        public string PriorityDescription { get; set; }
        [DataMember]
        public int PriorityWeight { get; set; }
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

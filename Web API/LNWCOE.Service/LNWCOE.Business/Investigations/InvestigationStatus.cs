using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.Investigations
{
    [DataContract]
    [Serializable]
    public class InvestigationStatus
    {
        [Key]
        [DataMember]
        public int InvestigationStatusID { get; set; }
        [DataMember]
        public string InvestigationStatusName { get; set; }
        [DataMember]
        public string InvestigationStatusDescription { get; set; }
        [DataMember]
        public bool IsDefault { get; set; }
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

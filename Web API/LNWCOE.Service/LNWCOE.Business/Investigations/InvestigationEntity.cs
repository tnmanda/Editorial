using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.Investigations
{
    [DataContract]
    [Serializable]
    public class InvestigationEntity
    {
        [Key]
        [DataMember]
        public int InvestigationEntityID { get; set; }
        [DataMember]
        public int InvestigationID { get; set; }
        [DataMember]
        public int? Ent_ID { get; set; }
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

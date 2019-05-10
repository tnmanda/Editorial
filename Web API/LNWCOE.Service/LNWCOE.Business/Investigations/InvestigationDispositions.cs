using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.Investigations
{
    [DataContract]
    [Serializable]
    public class InvestigationDispositions
    {
        [Key]
        [DataMember]
        public int InvestigationDispositionsID { get; set; }
        [DataMember]
        public string DispositionType { get; set; }
        [DataMember]
        public string DispositionDescription { get; set; }
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

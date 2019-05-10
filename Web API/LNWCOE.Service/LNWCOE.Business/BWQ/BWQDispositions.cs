using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.BWQ
{
    [DataContract]
    [Serializable]
    public class BWQDispositions
    {
        [Key]
        [DataMember]
        public int BWQDispositionsID { get; set; }
        [DataMember]
        public string BWQDispositionsDescription { get; set; }
        [DataMember]
        public string TextDisplayed { get; set; }
        [DataMember]
        public int SortOrder { get; set; }
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

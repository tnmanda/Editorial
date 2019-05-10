using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.BWQ
{
    [DataContract]
    [Serializable]
    public class BWQFieldSelect
    {
        [Key]
        [DataMember]
        public int BWQFieldSelectID { get; set; }
        [DataMember]
        public string FieldName { get; set; }
        [DataMember]
        public string SourceTable { get; set; }
        [DataMember]
        public string FieldDisplayName { get; set; }
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

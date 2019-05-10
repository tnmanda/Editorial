using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.Admin
{
    [DataContract]
    [Serializable]
    public class CertificateType
    {
        [Key]
        [DataMember]
        public int CertificateTypeID { get; set; }
        [DataMember]
        public string CertificateTypeName { get; set; }
        [DataMember]
        public string CertificateTypeDesc { get; set; }
        [DataMember]
        public bool IsInList { get; set; }
        [DataMember]
        public bool IsActive { get; set; }
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

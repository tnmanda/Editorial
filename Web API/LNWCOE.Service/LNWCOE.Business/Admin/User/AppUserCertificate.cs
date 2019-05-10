using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.Admin
{
    [DataContract]
    [Serializable]
    public class AppUserCertificate
    {
        [Key]
        [DataMember]
        public int AppUserCertificateID { get; set; }
        [DataMember]
        public int? AppUserID { get; set; }
        [DataMember]
        public int? CertificateTypeID { get; set; }
        [DataMember]
        public string CreatedBy { get; set; }
        [DataMember]
        public DateTime DateCreatedUTC { get; set; }
        [DataMember]
        public string UpdatedBy { get; set; }
        [DataMember]
        public DateTime LastUpdatedUTC { get; set; }
        [DataMember]
        public CertificateType CertificateType { get; set; }

    }
}

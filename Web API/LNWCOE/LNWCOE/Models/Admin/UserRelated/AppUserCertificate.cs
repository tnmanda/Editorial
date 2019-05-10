using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Admin
{
    public class AppUserCertificate
    {
        [Key]
        public int AppUserCertificateID { get; set; }
        public int? AppUserID { get; set; }
        public int? CertificateTypeID { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }

        public CertificateType CertificateType { get; set; }

    }
}

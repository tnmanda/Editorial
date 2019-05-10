using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.Admin
{
    [DataContract]
    [Serializable]
    public class Office
    {
        [Key]
        [DataMember]
        public int OfficeID { get; set; }
        [DataMember]
        public string OfficeName { get; set; }
        [DataMember]
        public int? CountryID { get; set; }
        [DataMember]
        public string Company { get; set; }
        [DataMember]
        public string City { get; set; }
        [DataMember]
        public bool? IsSales { get; set; }
        [DataMember]
        public bool? IsResearch { get; set; }
        [DataMember]
        public bool? IsMarketing { get; set; }
        [DataMember]
        public bool? IsSupport { get; set; }
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
        [DataMember]
        public Country Country { get; set; }
    }
}

using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.Admin
{
    [DataContract]
    [Serializable]
    public class AppUserCountry
    {
        [Key]
        [DataMember]
        public int AppUserCountryID { get; set; }
        [DataMember]
        public int AppUserID { get; set; }
        [DataMember]
        public int? CountryID { get; set; }
        [DataMember]
        public bool IsLocked { get; set; }
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

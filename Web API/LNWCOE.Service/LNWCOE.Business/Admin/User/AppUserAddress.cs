using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.Admin
{
    [DataContract]
    [Serializable]
    public class AppUserAddress
    {
        [Key]
        [DataMember]
        public int AppUserAddressID { get; set; }
        [DataMember]
        public int AddressTypeID { get; set; }
        [DataMember]
        public int AppUserID { get; set; }
        [DataMember]
        public string Address1 { get; set; }
        [DataMember]
        public string Address2 { get; set; }
        [DataMember]
        public string Address3 { get; set; }
        [DataMember]
        public string City { get; set; }
        [DataMember]
        public string ProvinceStateRegion { get; set; }
        [DataMember]
        public int? CountryID { get; set; }
        [DataMember]
        public string PostalCode { get; set; }
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
        [DataMember]
        public AddressType AddressType { get; set; }

    }
}

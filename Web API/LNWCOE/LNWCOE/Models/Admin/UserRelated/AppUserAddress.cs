using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Admin
{
    public class AppUserAddress
    {
        [Key]
        public int AppUserAddressID { get; set; }
        public int AddressTypeID { get; set; }
        public int AppUserID { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string City { get; set; }
        public string ProvinceStateRegion { get; set; }
        public int? CountryID { get; set; }
        public string PostalCode { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }

        public Country Country { get; set; }
        public AddressType AddressType { get; set; }

    }
}

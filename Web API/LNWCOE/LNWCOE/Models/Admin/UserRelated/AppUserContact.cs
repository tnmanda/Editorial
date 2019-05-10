using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Admin
{
    public class AppUserContact
    {
        [Key]
        public int AppUserContactID { get; set; }
        public int AppUserID { get; set; }
        public int ContactTypeID { get; set; }
        public string ContactTypeValue { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }

        public ContactType ContactType { get; set; }

    }
}

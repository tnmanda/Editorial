using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.Admin
{
    [DataContract]
    [Serializable]
    public class AppUserContact
    {
        [Key]
        [DataMember]
        public int AppUserContactID { get; set; }
        [DataMember]
        public int AppUserID { get; set; }
        [DataMember]
        public int ContactTypeID { get; set; }
        [DataMember]
        public string ContactTypeValue { get; set; }
        [DataMember]
        public string CreatedBy { get; set; }
        [DataMember]
        public DateTime DateCreatedUTC { get; set; }
        [DataMember]
        public string UpdatedBy { get; set; }
        [DataMember]
        public DateTime LastUpdatedUTC { get; set; }
        [DataMember]
        public ContactType ContactType { get; set; }

    }
}

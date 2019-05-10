using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.Admin
{
    [DataContract]
    [Serializable]
    public class AppUserInRole
    {
        [Key]
        [DataMember]
        public int AppUserInRoleID { get; set; }
        [DataMember]
        public int AppUserID { get; set; }
        [DataMember]
        public int RoleTypeID { get; set; }
        [DataMember]
        public string CreatedBy { get; set; }
        [DataMember]
        public DateTime DateCreatedUTC { get; set; }
        [DataMember]
        public string UpdatedBy { get; set; }
        [DataMember]
        public DateTime LastUpdatedUTC { get; set; }
        [DataMember]
        public RoleType RoleType { get; set; }
    }
}

using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.Admin
{
    [DataContract]
    [Serializable]
    public class RoleType
    {
        [Key]
        [DataMember]
        public int RoleTypeID { get; set; }
        [DataMember]
        public string RoleTypeName { get; set; }
        [DataMember]
        public string RoleTypeDesc { get; set; }
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

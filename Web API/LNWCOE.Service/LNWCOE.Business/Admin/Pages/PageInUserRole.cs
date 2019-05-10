using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.Admin.Pages
{
    [DataContract]
    public class PageInUserRole
    {
        [Key]
        [DataMember]
        public int PageInUserRoleID { get; set; }
        [DataMember]
        public int PagesID { get; set; }
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
        public Pages Page { get; set; }
        [DataMember]
        public RoleType Role { get; set; }
    }
}

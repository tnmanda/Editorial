using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.Admin.Pages
{
    [DataContract]
    [Serializable]
    public class PagesGroups
    {
        [Key]
        [DataMember]
        public int PagesGroupsID { get; set; }
        [DataMember]
        public int? ParentGroupID { get; set; }
        [DataMember]
        public string PagesGroupsName { get; set; }
        [DataMember]
        public string PagesGroupsDescription { get; set; }
        [DataMember]
        public short? SortOrder { get; set; }
        [DataMember]
        public string CreatedBy { get; set; }
        [DataMember]
        public DateTime DateCreatedUTC { get; set; }
        [DataMember]
        public string UpdatedBy { get; set; }
        [DataMember]
        public DateTime LastUpdatedUTC { get; set; }
        [DataMember]
        public ParentGroup ParentGroup { get; set; }
    }
}

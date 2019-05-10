using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.Admin.Pages

{
    [DataContract]
    [Serializable]
    public class Pages
    {
        [Key]
        [DataMember]
        public int PagesID { get; set; }
        [DataMember]
        public string PageName { get; set; }
        [DataMember]
        public string FullPath { get; set; }
        [DataMember]
        public string PagesDescription { get; set; }
        [DataMember]
        public bool IsActive { get; set; }
        [DataMember]
        public int? PagesGroupsID { get; set; }
        [DataMember]
        public string CreatedBy { get; set; }
        [DataMember]
        public DateTime DateCreatedUTC { get; set; }
        [DataMember]
        public string UpdatedBy { get; set; }
        [DataMember]
        public DateTime LastUpdatedUTC { get; set; }
        [DataMember]
        public PagesGroups PagesGroups { get; set; }
    }
}

using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.Admin.Pages
{
    [DataContract]
    [Serializable]
    public class ParentGroup
    {
        [Key]
        [DataMember]
        public int ParentGroupID { get; set; }
        [DataMember]
        public string ParentGroupName { get; set; }
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

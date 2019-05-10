using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.Admin
{
    [DataContract]
    [Serializable]
    public class CollectionItem
    {
        [Key]
        [DataMember]
        public int CollectionItemID { get; set; }
        [DataMember]
        public int CollectionID { get; set; }
        [DataMember]
        public int SortOrder { get; set; }
        [DataMember]
        public string ItemText { get; set; }
        [DataMember]
        public string ItemValue { get; set; }
        [DataMember]
        public string ItemDescription { get; set; }
        [DataMember]
        public string CreatedBy { get; set; }
        [DataMember]
        public DateTime DateCreatedUTC { get; set; }
        [DataMember]
        public string UpdatedBy { get; set; }
        [DataMember]
        public DateTime LastUpdatedUTC { get; set; }
        [DataMember]
        public Collection Collection { get; set; }
    }
}

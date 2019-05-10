using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.Admin
{
    [DataContract]
    [Serializable]
    public class Collection
    {
        [Key]
        [DataMember]
        public int CollectionID { get; set; }
        [DataMember]
        public string CollectionName { get; set; }
        [DataMember]
        public string CollectionDescription { get; set; }
        [DataMember]
        public int SortOrder { get; set; }
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

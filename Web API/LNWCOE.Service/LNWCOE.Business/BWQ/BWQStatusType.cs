using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.BWQ
{
    [DataContract]
    [Serializable]
    public class BWQStatusType
    {
        [Key]
        [DataMember]
        public int BWQStatusTypeID { get; set; }
        [DataMember]
        public string BwqStatusTypeDescription { get; set; }
        [DataMember]
        public int SortOrder { get; set; }
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

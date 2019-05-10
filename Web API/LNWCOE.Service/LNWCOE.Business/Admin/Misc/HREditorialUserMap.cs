using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.Admin
{
    [DataContract]
    [Serializable]
    public class HREditorialUserMap
    {
        [Key]
        [DataMember]
        public int HREditorialUserMapID { get; set; }
        [DataMember]
        public int AppUserID { get; set; }
        [DataMember]
        public string HumanReviewUserID { get; set; }
        [DataMember]
        public string CreatedBy { get; set; }
        [DataMember]
        public DateTime DateCreatedUTC { get; set; }
        [DataMember]
        public string UpdatedBy { get; set; }
        [DataMember]
        public DateTime LastUpdatedUTC { get; set; }
        [DataMember]
        public AppUser AppUser { get; set; }
    }
}

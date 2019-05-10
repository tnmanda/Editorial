using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.News
{
    [DataContract]
    [Serializable]
    public class NewsStatus
    {
        [Key]
        [DataMember]
        public int NewsStatusID { get; set; }
        [DataMember]
        public int NewsStatusValue { get; set; }
        [DataMember]
        public string NewsStatusDescription { get; set; }
        [DataMember]
        public int NewsState { get; set; }
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

using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.Investigations
{
    [DataContract]
    [Serializable]
    public class InvestigationActivity
    {
        [Key]
        [DataMember]
        public int InvestigationActivityID { get; set; }
        [DataMember]
        public int InvestigationID { get; set; }
        [DataMember]
        public int ActivityTypeID { get; set; }
        [DataMember]
        public int AppUserID { get; set; }
        [DataMember]
        public string FromValue { get; set; }
        [DataMember]
        public string ToValue { get; set; }
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

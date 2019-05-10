using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.Investigations
{
    [DataContract]
    [Serializable]
    public class InvestigationEmails
    {
        [Key]
        [DataMember]
        public int InvestigationEmailID { get; set; }
        [DataMember]
        public int InvestigationID { get; set; }
        [DataMember]
        public int AppUserID { get; set; }
        [DataMember]
        public string SentTo { get; set; }
        [DataMember]
        public string SentFrom { get; set; }
        [DataMember]
        public string Subject { get; set; }
        [DataMember]
        public string EmailBody { get; set; }
        [DataMember]
        public DateTime SentDateUTC { get; set; }
        [DataMember]
        public string StatusOrErrorMessage { get; set; }
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

using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using LNWCOE.Models.Admin;

namespace LNWCOE.Models.Alerts
{
    [DataContract]
    [Serializable]
    public class AlertJobs
    {
        [Key]
        [DataMember]
        public int AlertJobsID { get; set; }
        [DataMember]
        public string JobName { get; set; }
        [DataMember]
        public string JobAbbrev { get; set; }
        [DataMember]
        public string JobDescription { get; set; }
        [DataMember]
        public string JobURL { get; set; }
        [DataMember]
        public bool IsActive { get; set; }
        [DataMember]
        public string JobSpecialInstructions { get; set; }
        [DataMember]
        public string JobComments { get; set; }
        [DataMember]
        public int? AlertSourceTypeID { get; set; }
        [DataMember]
        public int? CountryID { get; set; }
        [DataMember]
        public string JobScrapperClassName { get; set; }
        [DataMember]
        public string JobScrapperAssemble { get; set; }
        [DataMember]
        public bool? IsWithLookUpID { get; set; }
        [DataMember]
        public string TableNameSource { get; set; }
        [DataMember]
        public bool? IsShowOnDynamicDisplay { get; set; }
        [DataMember]
        public string Regex { get; set; }
        [DataMember]
        public string RegexForPages { get; set; }
        [DataMember]
        public string Encoding { get; set; }
        [DataMember]
        public bool? IsPreventDeletions { get; set; }
        [DataMember]
        public bool? IsUserTermsFilter { get; set; }
        [DataMember]
        public bool? IsSendNoUpdate { get; set; }
        [DataMember]
        public int? TeamID { get; set; }
        [DataMember]
        public byte? PriorityCode { get; set; }
        [DataMember]
        public bool? IsUseProxy { get; set; }
        [DataMember]
        public bool? IsCriticalJob { get; set; }
        [DataMember]
        public int? ResultType { get; set; }
        [DataMember]
        public string CreatedBy { get; set; }
        [DataMember]
        public DateTime? DateCreatedUTC { get; set; }
        [DataMember]
        public string UpdatedBy { get; set; }
        [DataMember]
        public DateTime? LastUpdatedUTC { get; set; }
        [DataMember]
        public Country Country { get; set; }
        [DataMember]
        public Team Team { get; set; }
        [DataMember]
        public AlertSourceType AlertSourceType { get; set; }  
    }
}

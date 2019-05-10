using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using LNWCOE.Models.Admin;

namespace LNWCOE.Models.Investigations
{
    [DataContract]
    [Serializable]
    public class Investigation
    {
        [Key]
        [DataMember]
        public int InvestigationID { get; set; }
        [DataMember]
        public int? PriorityTypeID { get; set; }
        [DataMember]
        public int? CountryID { get; set; }
        [DataMember]
        public int? FunctionTypeID { get; set; }
        [DataMember]
        public int? InvestigationDispositionsID { get; set; }
        [DataMember]
        public int? InvestigationStatusID { get; set; }
        [DataMember]
        public string EntityName { get; set; }
        [DataMember]
        public string CountryOfRecord { get; set; }
        [DataMember]
        public string DOB { get; set; }
        [DataMember]
        public string Reason { get; set; }
        [DataMember]
        public string OtherInfo { get; set; }
        [DataMember]
        public string Comments { get; set; }
        [DataMember]
        public int MMMDDUsersID { get; set; }
        [DataMember]
        public string CreatedByIP { get; set; }
        [DataMember]
        public bool IsCanContactSubmitter { get; set; }
        [DataMember]
        public string RequestedBy { get; set; }
        [DataMember]
        public string CreatedBy { get; set; }
        [DataMember]
        public DateTime DateCreatedUTC { get; set; }
        [DataMember]
        public string UpdatedBy { get; set; }
        [DataMember]
        public DateTime LastUpdatedUTC { get; set; }
        [DataMember]
        public PriorityType PriorityType { get; set; }
        [DataMember]
        public Country Country { get; set; }
        [DataMember]
        public FunctionType FunctionType { get; set; }
        [DataMember]
        public InvestigationDispositions InvestigationDispositions { get; set; }
        [DataMember]
        public InvestigationStatus InvestigationStatus { get; set; }
        [DataMember]
        public Guid? WorkItemID { get; set; }

    }
}

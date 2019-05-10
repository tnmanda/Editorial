using System;
using System.ComponentModel.DataAnnotations;
using LNWCOE.Models.Admin;
using LNWCOE.Models.Entity;

namespace LNWCOE.Models.INV
{
    public class Investigation 
    {
        [Key]
        public int InvestigationID { get; set; }
        public int? PriorityTypeID { get; set; }
        public int? CountryID { get; set; }
        public int? FunctionTypeID { get; set; }
        public int? InvestigationDispositionsID { get; set; }
        public int? InvestigationStatusID { get; set; }
        public string EntityName { get; set; }
        public string CountryOfRecord { get; set; }
        public string DOB { get; set; }
        public string Reason { get; set; }
        public string OtherInfo { get; set; }
        public string Comments { get; set; }
        public int MMMDDUsersID { get; set; }
        public string CreatedByIP { get; set; }
        public bool IsCanContactSubmitter { get; set; }
        public string RequestedBy { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }

        public PriorityType PriorityType { get; set; }
        public Country Country { get; set; }
        public FunctionType FunctionType { get; set; }
        public InvestigationDispositions InvestigationDispositions { get; set; }
        public InvestigationStatus InvestigationStatus { get; set; }

        public Guid? WorkItemID { get; set; }

    }

    public class InvestigationFilter
    {
        [Key]
        public string countryName { get; set; }
        public string categoryName { get; set; }
        public string batchName { get; set; }
        public bool aging { get; set; }
        public string appUserID { get; set; }

    }

    public class InvestigationData
    {
        [Key]
        public int InvestigationID { get; set; }
        public int Due { get; set; }
        public string Priority { get; set; }
        public string InvestigationStatusName { get; set; }
        public string FullName { get; set; }
        public DateTime? DateCreatedUTC { get; set; }
        public string LastActivityBy { get; set; }
        public DateTime? LastActivityDate { get; set; }
        public string LockedBy { get; set; }
        public string LockedAt { get; set; }
        public string CountryName { get; set; }
        public string Category { get; set; }
    }

    public class InvestigationDataSave
    {
        public Investigation Investigation { get; set; }
        public string HRToken { get; set; }
        public InvestigationNote InvestigationNote { get; set;}
    }

    public class InvestiationEmailRequest
    {
        public int AppUserID { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
        public string RecipientEmail { get; set; }
        public int IndexFromWorkTable { get; set; }
    }

}

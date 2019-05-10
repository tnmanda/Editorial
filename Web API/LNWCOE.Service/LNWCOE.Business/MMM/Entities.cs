using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.MMM
{
    [DataContract]
    [Serializable]
    public class Entities
    {
        [Key]
        [DataMember]
        public int Ent_ID { get; set; }
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public string FirstName { get; set; }
        [DataMember]
        public string LastName { get; set; }
        [DataMember]
        public string Prefix { get; set; }
        [DataMember]
        public string Suffix { get; set; }
        [DataMember]
        public string Aka { get; set; }
        [DataMember]
        public string NameSource { get; set; }
        [DataMember]
        public int? ParentID { get; set; }
        [DataMember]
        public string GovDesignation { get; set; }
        [DataMember]
        public string EntryType { get; set; }
        [DataMember]
        public string EntryCategory { get; set; }
        [DataMember]
        public string EntrySubCategory { get; set; }
        [DataMember]
        public string Organization { get; set; }
        [DataMember]
        public string Positions { get; set; }
        [DataMember]
        public string Remarks { get; set; }
        [DataMember]
        public string DOB { get; set; }
        [DataMember]
        public string POB { get; set; }
        [DataMember]
        public string Country { get; set; }
        [DataMember]
        public string ExpirationDate { get; set; }
        [DataMember]
        public string EffectiveDate { get; set; }
        [DataMember]
        public string PictureFile { get; set; }
        [DataMember]
        public string PictureFileOnly { get; set; }
        [DataMember]
        public string LinkedTo { get; set; }
        [DataMember]
        public bool? ProfileExists { get; set; }
        [DataMember]
        public Guid? LookUpId { get; set; }
        [DataMember]
        public DateTime? DateEntered { get; set; }
        [DataMember]
        public DateTime? DateUpdated { get; set; }
        [DataMember]
        public string EnteredBy { get; set; }
        [DataMember]
        public string UpdatedBy { get; set; }
        [DataMember]
        public int? Related_ID { get; set; }
        [DataMember]
        public string SourceWebLink { get; set; }
        [DataMember]
        public byte? WCGroupLevel { get; set; }
        [DataMember]
        public string BatchName { get; set; }
        [DataMember]
        public int? AID { get; set; }
        [DataMember]
        public DateTime? TouchDate { get; set; }
        [DataMember]
        public string OriginalName { get; set; }
        [DataMember]
        public int? JurisdictionID { get; set; }
        [DataMember]
        public string PassportID { get; set; }
        [DataMember]
        public string NationalID { get; set; }
        [DataMember]
        public string OtherID { get; set; }
        [DataMember]
        public string DOB2 { get; set; }
        [DataMember]
        public string EntLevel { get; set; }
        [DataMember]
        public int? MasterID { get; set; }
        [DataMember]
        public bool? Watch { get; set; }
        [DataMember]
        public bool? Relationships { get; set; }
        [DataMember]
        public decimal? CriminalAmount { get; set; }
        [DataMember]
        public string NameClean { get; set; }
        [DataMember]
        public string TermStartDate { get; set; }
        [DataMember]
        public string TermEndDate { get; set; }
        [DataMember]
        public DateTime? StatusEndDate { get; set; }
        [DataMember]
        public bool? SpecialCollections { get; set; }
        [DataMember]
        public string DobOriginal { get; set; }
        [DataMember]
        public string OldEntryCategory { get; set; }
        [DataMember]
        public string OldEntrySubCategory { get; set; }
        [DataMember]
        public string OldNameSource { get; set; }
        [DataMember]
        public short? EntitiesLevelsId { get; set; }
        [DataMember]
        public short? EntryCategoryID { get; set; }
        [DataMember]
        public short? EntrySubCategoryID { get; set; }
        [DataMember]
        public short? EntitiesSourceID { get; set; }
        [DataMember]
        public short? EntryTypeID { get; set; }
        [DataMember]
        public short? CountryId { get; set; }
        [DataMember]
        public short PepCode { get; set; }
        [DataMember]
        public string NameClean2 { get; set; }
        [DataMember]
        public string Gender { get; set; }
        [DataMember]
        public int? OriginalLanguage { get; set; }
        [DataMember]
        public bool? QA_Approved { get; set; }
        [DataMember]
        public byte? CiIndex { get; set; }
        [DataMember]
        public string CiElements { get; set; }
        [DataMember]
        public short? CiBit { get; set; }
        [DataMember]
        public DateTime? LastInvestigationDate { get; set; }
        [DataMember]
        public string LastInvestigatedBy { get; set; }
        [DataMember]
        public short? Rank1 { get; set; }
        [DataMember]
        public short? Rank2 { get; set; }
        [DataMember]
        public short? Rank3 { get; set; }
        [DataMember]
        public short? Rank4 { get; set; }
        [DataMember]
        public short? Rank5 { get; set; }
        [DataMember]
        public int? RecViews { get; set; }
        [DataMember]
        public string OriginalName2 { get; set; }
        [DataMember]
        public string OriginalName3 { get; set; }
        [DataMember]
        public string SourceWebLink2 { get; set; }
        [DataMember]
        public bool? OriginalName2NoChange { get; set; }
        [DataMember]
        public bool? Approved { get; set; }
        [DataMember]
        public DateTime? ApprovedDate { get; set; }
        [DataMember]
        public string ApprovedBy { get; set; }
        [DataMember]
        public bool? Rejected { get; set; }
        [DataMember]
        public DateTime? RejectedDate { get; set; }
        [DataMember]
        public string RejectedBy { get; set; }
        [DataMember]
        public DateTime? LastReviewedDate { get; set; }
        [DataMember]
        public string LastReviewedBy { get; set; }
        [DataMember]
        public string ImageSourceURL { get; set; }
    }
}

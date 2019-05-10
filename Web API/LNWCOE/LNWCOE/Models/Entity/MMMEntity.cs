using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Entity
{
    public class Entities
    {
        [Key]
        public int Ent_ID { get; set; }
        public string Name { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Prefix { get; set; }
        public string Suffix { get; set; }
        public string Aka { get; set; }
        public string NameSource { get; set; }
        public int? ParentID { get; set; }
        public string GovDesignation { get; set; }
        public string EntryType { get; set; }
        public string EntryCategory { get; set; }
        public string EntrySubCategory { get; set; }
        public string Organization { get; set; }
        public string Positions { get; set; }
        public string Remarks { get; set; }
        public string DOB { get; set; }
        public string POB { get; set; }
        public string Country { get; set; }
        public string ExpirationDate { get; set; }
        public string EffectiveDate { get; set; }
        public string PictureFile { get; set; }
        public string PictureFileOnly { get; set; }
        public string LinkedTo { get; set; }
        public bool? ProfileExists { get; set; }
        public Guid? LookUpId { get; set; }
        public DateTime? DateEntered { get; set; }
        public DateTime? DateUpdated { get; set; }
        public string EnteredBy { get; set; }
        public string UpdatedBy { get; set; }
        public int? Related_ID { get; set; }
        public string SourceWebLink { get; set; }
        public byte? WCGroupLevel { get; set; }
        public string BatchName { get; set; }
        public int? AID { get; set; }
        public DateTime? TouchDate { get; set; }
        public string OriginalName { get; set; }
        public int? JurisdictionID { get; set; }
        public string PassportID { get; set; }
        public string NationalID { get; set; }
        public string OtherID { get; set; }
        public string DOB2 { get; set; }
        public string EntLevel { get; set; }
        public int? MasterID { get; set; }
        public bool? Watch { get; set; }
        public bool? Relationships { get; set; }
        public decimal? CriminalAmount { get; set; }
        public string NameClean { get; set; }
        public string TermStartDate { get; set; }
        public string TermEndDate { get; set; }
        public DateTime? StatusEndDate { get; set; }
        public bool? SpecialCollections { get; set; }
        public string DobOriginal { get; set; }
        public string OldEntryCategory { get; set; }
        public string OldEntrySubCategory { get; set; }
        public string OldNameSource { get; set; }
        public short? EntitiesLevelsId { get; set; }
        public short? EntryCategoryID { get; set; }
        public short? EntrySubCategoryID { get; set; }
        public short? EntitiesSourceID { get; set; }
        public short? EntryTypeID { get; set; }
        public short? CountryId { get; set; }
        public short PepCode { get; set; }
        public string NameClean2 { get; set; }
        public string Gender { get; set; }
        public int? OriginalLanguage { get; set; }
        public bool? QA_Approved { get; set; }
        public byte? CiIndex { get; set; }
        public string CiElements { get; set; }
        public short? CiBit { get; set; }
        public DateTime? LastInvestigationDate { get; set; }
        public string LastInvestigatedBy { get; set; }
        public short? Rank1 { get; set; }
        public short? Rank2 { get; set; }
        public short? Rank3 { get; set; }
        public short? Rank4 { get; set; }
        public short? Rank5 { get; set; }
        public int? RecViews { get; set; }
        public string OriginalName2 { get; set; }
        public string OriginalName3 { get; set; }
        public string SourceWebLink2 { get; set; }
        public bool? OriginalName2NoChange { get; set; }
        public bool? Approved { get; set; }
        public DateTime? ApprovedDate { get; set; }
        public string ApprovedBy { get; set; }
        public bool? Rejected { get; set; }
        public DateTime? RejectedDate { get; set; }
        public string RejectedBy { get; set; }
        public DateTime? LastReviewedDate { get; set; }
        public string LastReviewedBy { get; set; }
        public string ImageSourceURL { get; set; }
    }


    public class MMMEntitiesShort
    {
        [Key]
        public int Ent_ID { get; set; }
        public string Name { get; set; }
        public string EntryCategory { get; set; }
        public string EntrySubCategory { get; set; }
        public string Country { get; set; }
    }

    public class MMMEntityName
    {
        public string Name { get; set; }
    }

}

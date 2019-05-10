using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.Admin
{
    [DataContract]
    [Serializable]
    public class AppUserLanguage
    {
        [Key]
        [DataMember]
        public int AppUserLanguageID { get; set; }
        [DataMember]
        public int? LanguageTypeID { get; set; }
        [DataMember]
        public int? AppUserID { get; set; }
        [DataMember]
        public int? ProficiencyTypeID { get; set; }
        [DataMember]
        public bool IsMonitored { get; set; }
        [DataMember]
        public string CreatedBy { get; set; }
        [DataMember]
        public DateTime DateCreatedUTC { get; set; }
        [DataMember]
        public string UpdatedBy { get; set; }
        [DataMember]
        public DateTime LastUpdatedUTC { get; set; }
        [DataMember]
        public LanguageType LanguageType { get; set; }
        [DataMember]
        public ProficiencyType ProficiencyType { get; set; }
    }
}

using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.Admin
{
    [DataContract]
    [Serializable]
    public class AppUserEducation
    {
        [Key]
        [DataMember]
        public int AppUserEducationID { get; set; }
        [DataMember]
        public int AppUserID { get; set; }
        [DataMember]
        public int EducationTypeID { get; set; }
        [DataMember]
        public string CreatedBy { get; set; }
        [DataMember]
        public DateTime DateCreatedUTC { get; set; }
        [DataMember]
        public string UpdatedBy { get; set; }
        [DataMember]
        public DateTime LastUpdatedUTC { get; set; }
        [DataMember]
        public EducationType EducationType { get; set; }
    }
}

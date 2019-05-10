using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.Admin
{
    [DataContract]
    [Serializable]
    public class AppUser
    {
        [Key]
        [DataMember]
        public int AppUserID { get; set; }
        [DataMember]
        public string AppUserName { get; set; }
        [DataMember]
        public string Email { get; set; }
        [DataMember]
        public byte[] PhotoImage { get; set; }
        [DataMember]
        public int? UTCOffset { get; set; }
        [DataMember]
        public bool IsInternal { get; set; }
        [DataMember]
        public bool IsActive { get; set; }
        [DataMember]
        public int SupervisorAppUserID { get; set; }
        [DataMember]
        public int OfficeID { get; set; }
        [DataMember]
        public int OperationalRoleTypeID { get; set; }
        [DataMember]
        public int GenderTypeID { get; set; }
        [DataMember]
        public string CreatedBy { get; set; }
        [DataMember]
        public string UpdatedBy { get; set; }
        [DataMember]
        public DateTime DateCreatedUTC { get; set; }
        [DataMember]
        public DateTime LastUpdatedUTC { get; set; }
        [DataMember]
        public Office Office { get; set; }
        [DataMember]
        public OperationalRoleType OperationalRole { get; set; }
        [DataMember]
        public GenderType Gender { get; set; }
    }
}

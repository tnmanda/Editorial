using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.Admin
{
    [DataContract]
    [Serializable]
    public class RecordLocks
    {
        [Key]
        [DataMember]
        public int RecordLockID { get; set; }
        [DataMember]
        public int WorkUnitTypeID { get; set; }
        [DataMember]
        public int AppUserID { get; set; }
        [DataMember]
        public int IDFromWorkUnitsDBTable { get; set; }
        [DataMember]
        public DateTime DateTimeItemWasLockedUTC { get; set; }
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

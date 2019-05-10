using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;


namespace LNWCOE.Models.Admin
{
    [DataContract]
    [Serializable]
    public class WorkUnitLockDurationInMin
    {
        [Key]
        [DataMember]
        public int WorkLockDurationInMinID { get; set; }
        [DataMember]
        public int WorkUnitTypeID { get; set; }
        [DataMember]
        public string DurationInMinutes { get; set; }
        [DataMember]
        public bool IsActive { get; set; }
        [DataMember]
        public string CreatedBy { get; set; }
        [DataMember]
        public DateTime DateCreatedUTC { get; set; }
        [DataMember]
        public string UpdatedBy { get; set; }
        [DataMember]
        public DateTime LastUpdatedUTC { get; set; }
        [DataMember]
        public WorkUnitType WorkUnitType { get; set; }
    }
}

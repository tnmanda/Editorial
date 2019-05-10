using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Admin
{
    public class RecordLocks
    {
        [Key]
        public int RecordLockID { get; set; }
        public int WorkUnitTypeID { get; set; }
        public int AppUserID { get; set; }
        public int IDFromWorkUnitsDBTable { get; set; }
        public DateTime DateTimeItemWasLockedUTC { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }
    }

    public class LockEntry
    {
        public int WorkUnitTypeID { get; set; }
        public int AppUserID { get; set; }
        public int IDFromWorkUnitsDBTable { get; set; }
    }

    public class WorkUnitLockDurationInMin
    {
        [Key]
        public int WorkLockDurationInMinID { get; set; }
        public int WorkUnitTypeID { get; set; }
        public string DurationInMinutes { get; set; }
        public bool IsActive { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }
        
        public WorkUnitType WorkUnitType { get; set; }
    }


}

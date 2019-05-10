using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Admin
{
    public class UserDisplay
    {
        [Key]
        public int AppUserID { get; set; }
        public string AppUserName { get; set; }
        public string Email { get; set; }
        public byte[] PhotoImage { get; set; }
        public int? UTCOffset { get; set; }
        public bool IsInternal { get; set; }
        public bool IsActive { get; set; }
        public int SupervisorAppUserID { get; set; }
        public int OfficeID { get; set; }
        public int OperationalRoleTypeID { get; set; }
        public int GenderTypeID { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public DateTime LastUpdatedUTC { get; set; }

        public string SupervisorName { get; set; }
        public string OfficeName { get; set; }
        public string OperationalRoleName { get; set; }
        public string GenderName { get; set; }
        public int? RoleTypeID { get; set; }
        public string RoleTypeName { get; set; }
    }
}

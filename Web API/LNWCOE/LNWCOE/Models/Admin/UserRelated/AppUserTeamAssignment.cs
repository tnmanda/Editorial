using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Admin
{
    public class AppUserTeamAssignment
    {
        [Key]
        public int AppUserTeamAssignmentID { get; set; }
        public int? AppUserID { get; set; }
        public int? TeamID { get; set; }
        public int? AssignmentTypeID { get; set; }
        public bool? IsDone { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }

        public Team Team { get; set; }
        public AssignmentType AssignmentType { get; set; }
    }
}

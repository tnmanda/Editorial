using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Admin
{
    public class AppUserTeam
    {
        [Key]
        public int AppUserTeamID { get; set; }
        public int? TeamID { get; set; }
        public int? AppUserID { get; set; }
        public string Comments { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }

        public Team Team { get; set; }
    }
}

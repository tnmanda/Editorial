using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.Admin
{
    [DataContract]
    [Serializable]
    public class AppUserTeam
    {
        [Key]
        [DataMember]
        public int AppUserTeamID { get; set; }
        [DataMember]
        public int? TeamID { get; set; }
        [DataMember]
        public int? AppUserID { get; set; }
        [DataMember]
        public string Comments { get; set; }
        [DataMember]
        public string CreatedBy { get; set; }
        [DataMember]
        public DateTime DateCreatedUTC { get; set; }
        [DataMember]
        public string UpdatedBy { get; set; }
        [DataMember]
        public DateTime LastUpdatedUTC { get; set; }
        [DataMember]
        public Team Team { get; set; }
    }
}

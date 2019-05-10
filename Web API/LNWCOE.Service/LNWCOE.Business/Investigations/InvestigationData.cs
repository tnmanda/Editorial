using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Investigations
{
    public class InvestigationData
    {
        [Key]
        public int InvestigationID { get; set; }
        public int Due { get; set; }
        public string Priority { get; set; }
        public string InvestigationStatusName { get; set; }
        public string FullName { get; set; }
        public DateTime? DateCreatedUTC { get; set; }
        public string LastActivityBy { get; set; }
        public DateTime? LastActivityDate { get; set; }
        public string LockedBy { get; set; }
        public DateTime? LockedAt { get; set; }
        public string CountryName { get; set; }
        public string Category { get; set; }
    }
}

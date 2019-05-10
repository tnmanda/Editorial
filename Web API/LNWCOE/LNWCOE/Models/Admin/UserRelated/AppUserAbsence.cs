using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Admin
{
    public class AppUserAbsence
    {
        [Key]
        public int AppUserAbsenceID { get; set; }
        public int AppUserID { get; set; }
        public DateTime? StartDateUTC { get; set; }
        public DateTime? EndDateUTC { get; set; }
        public int? AbsenceTypeID { get; set; }
        public string Notes { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }

        public AbsenceType AbsenceType { get; set; }

    }
}

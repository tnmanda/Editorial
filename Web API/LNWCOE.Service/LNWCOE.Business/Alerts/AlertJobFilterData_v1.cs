using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Alerts
{
    public class AlertJobFilterData_v1
    {
        [Key]
        public int PkJobID { get; set; }
        public string JobName { get; set; }
        public string JobUrl { get; set; }
        public int OpenJobCount { get; set; }
        public int AlertNameID { get; set; }
        public int fkCountryID { get; set; }
        public string Country { get; set; }
        public string NameEntry { get; set; }
        public int EditTypeID { get; set; }
        public int DispositionTypeID { get; set; }
        public int fkRecipientID { get; set; }
        public string DispositionUser { get; set; }
        public DateTime EmailPoolDateCreated { get; set; }
        public string EmailKey { get; set; }
        public string EmailKeyNext { get; set; }
        public bool Completed { get; set; }

    }
}

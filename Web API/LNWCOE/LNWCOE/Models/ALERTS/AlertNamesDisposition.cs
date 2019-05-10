using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.ALERTS
{
    public class AlertNamesDisposition
    {
        [Key]
        public int AlertNamesDispositionID { get; set; }
        public int AppUserID { get; set; }
        public int EditTypeID { get; set; }
        public int DispositionTypeID { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }
    }

}

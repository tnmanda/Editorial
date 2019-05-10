using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.ALERTS
{
    public class AlertNames
    {
        [Key]
        public int AlertNameID { get; set; }
        public int? AlertJobsID { get; set; }
        public string NameEntry { get; set; }
        public string SubDidivision { get; set; }
        public DateTime? EntryDateUTC { get; set; }
        public DateTime? DeletedDateUTC { get; set; }
        public long? id_mdb { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }
    }
}

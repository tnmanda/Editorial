using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.BWQ
{
    public class BWQStatusType
    {
        [Key]
        public int BWQStatusTypeID { get; set; }
        public string BwqStatusTypeDescription { get; set; }
        public int SortOrder { get; set; }
        public bool IsInList { get; set; }
        public bool IsActive { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }
    }
}

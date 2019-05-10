using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Admin
{
    public class ContactType
    {
        [Key]
        public int ContactTypeID { get; set; }
        public string ContactTypeDesc { get; set; }
        public string ContactTypeName { get; set; }
        public bool IsInList { get; set; }
        public bool IsActive { get; set; }
        public int ContactTypeGroup { get; set; }
        public int SortOrder { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }
    }
}

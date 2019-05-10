using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.BWQ
{
    public class BWQFieldSelect
    {
        [Key]
        public int BWQFieldSelectID { get; set; }
        public string FieldName { get; set; }
        public string SourceTable { get; set; }
        public string FieldDisplayName { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }
    }
}

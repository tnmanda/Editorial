using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.BWQ
{
    public class BWQDispositions
    {
        [Key]
        public int BWQDispositionsID { get; set; }
        public string BWQDispositionsDescription { get; set; }
        public string TextDisplayed { get; set; }
        public int SortOrder { get; set; }
        public bool IsDefault { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }
    }
}

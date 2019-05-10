using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.INV
{
    public class InvestigationDispositions
    {
        [Key]
        public int InvestigationDispositionsID { get; set; }
        public string DispositionType { get; set; }
        public string DispositionDescription { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }
    }
}

using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.INV
{
    public class InvestigationCategory
    {
        [Key]
        public int InvestigationCategoryID { get; set; }
        public int InvestigationID { get; set; }
        public int FunctionTypeID { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }
    }
}

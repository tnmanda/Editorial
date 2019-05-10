using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Admin.Page
{
    public class ParentGroup
    {
        [Key]
        public int ParentGroupID { get; set; }
        public string ParentGroupName { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }
    }
}

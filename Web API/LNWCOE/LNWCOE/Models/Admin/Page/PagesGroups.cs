using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Admin.Page
{
    public class PagesGroups
    {
        [Key]
        public int PagesGroupsID { get; set; }
        public int? ParentGroupID { get; set; }
        public string PagesGroupsName { get; set; }
        public string PagesGroupsDescription { get; set; }
        public short? SortOrder { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }

        public ParentGroup ParentGroup { get; set; }
    }
}

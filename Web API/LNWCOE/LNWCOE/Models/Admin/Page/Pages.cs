using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LNWCOE.Models.Admin.Page
{
    public class Pages
    {
        [Key]
        public int PagesID { get; set; }
        public string PageName { get; set; }
        public string FullPath { get; set; }
        public string PagesDescription { get; set; }
        public bool IsActive { get; set; }
        public int? PagesGroupsID { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }

        [ForeignKey("PagesGroupsID")]
        public PagesGroups PagesGroups { get; set; }
    }

    public class PagesEx
    {
        [Key]
        public int PagesID { get; set; }
        public string PageName { get; set; }
        public string FullPath { get; set; }
        public bool IsActive { get; set; }
        public int? PagesGroupsID { get; set; }
        public string PagesGroupsName { get; set; }
        public int? RoleTypeID { get; set; }
        public string RoleTypeName { get; set; }
        //public int? ParentGroupID { get; set; }
        //public string ParentGroupName { get; set; }
        public int PageInUserRoleID { get; set; } 
    }
}

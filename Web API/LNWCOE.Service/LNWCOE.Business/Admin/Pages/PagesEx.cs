using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Admin.Pages
{
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
        public int PageInUserRoleID { get; set; }
    }
}

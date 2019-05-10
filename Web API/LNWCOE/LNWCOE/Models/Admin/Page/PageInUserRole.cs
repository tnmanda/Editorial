using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LNWCOE.Models.Admin.Page
{
    public class PageInUserRole
    {
        [Key]
        public int PageInUserRoleID { get; set; }
        public int PagesID { get; set; }
        public int RoleTypeID { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }

        [ForeignKey("PagesID")]
        public Pages Page { get; set; }

        [ForeignKey("RoleTypeID")]
        public RoleType Role { get; set; }


    }
}

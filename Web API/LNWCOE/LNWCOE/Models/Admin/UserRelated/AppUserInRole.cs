﻿using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Admin
{
    public class AppUserInRole
    {
        [Key]
        public int AppUserInRoleID { get; set; }
        public int AppUserID { get; set; }
        public int RoleTypeID { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }

        public RoleType RoleType { get; set; }
    }
}

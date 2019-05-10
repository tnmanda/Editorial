﻿using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Admin
{
    public class WorkUnitType
    {
        [Key]
        public int WorkUnitTypeID { get; set; }
        public string WorkUnitTypeName { get; set; }
        public string WorkUnitTypeDesc { get; set; }
        public bool IsInList { get; set; }
        public bool IsActive { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }
    }
}

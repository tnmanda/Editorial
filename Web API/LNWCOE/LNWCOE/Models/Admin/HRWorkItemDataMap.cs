using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Admin
{
    public class HRWorkItemDataMap
    {
        [Key]
        public int HRWorkItemDataMapID { get; set; }
        public Guid? WorkItemID { get; set; }
        public int WorkUnitTypeID { get; set; }
        public int ModuleTableEntryID { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }
    }
}

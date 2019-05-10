using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Admin
{
    public class ApplicationModules
    {
        [Key]
        public int ApplicationModulesID { get; set; }
        public string ModuleName { get; set; }
        public Guid? ModuleGuid { get; set; }
        public Guid? ApplicationGuid { get; set; }
        public Guid? QueueGuid { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }
    }

}

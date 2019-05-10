using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.Admin
{
    [DataContract]
    [Serializable]
    public class ApplicationModules
    {
        [Key]
        [DataMember]
        public int ApplicationModulesID { get; set; }
        [DataMember]
        public string ModuleName { get; set; }
        [DataMember]
        public Guid? ModuleGuid { get; set; }
        [DataMember]
        public Guid? ApplicationGuid { get; set; }
        [DataMember]
        public Guid? QueueGuid { get; set; }
        [DataMember]
        public string CreatedBy { get; set; }
        [DataMember]
        public DateTime DateCreatedUTC { get; set; }
        [DataMember]
        public string UpdatedBy { get; set; }
        [DataMember]
        public DateTime LastUpdatedUTC { get; set; }
    }
}

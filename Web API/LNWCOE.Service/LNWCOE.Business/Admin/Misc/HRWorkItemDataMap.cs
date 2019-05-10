using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.Admin
{
    [DataContract]
    [Serializable]
    public class HRWorkItemDataMap
    {
        [Key]
        [DataMember]
        public int HRWorkItemDataMapID { get; set; }
        [DataMember]
        public Guid? WorkItemID { get; set; }
        [DataMember]
        public int WorkUnitTypeID { get; set; }
        [DataMember]
        public int ModuleTableEntryID { get; set; }
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

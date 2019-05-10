using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.Admin
{
    [DataContract]
    [Serializable]
    public class ContractType
    {
        [Key]
        [DataMember]
        public int ContractTypeID { get; set; }
        [DataMember]
        public string ContractTypeName { get; set; }
        [DataMember]
        public string ContractTypeDescr { get; set; }
        [DataMember]
        public bool IsInList { get; set; }
        [DataMember]
        public bool IsActive { get; set; }
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

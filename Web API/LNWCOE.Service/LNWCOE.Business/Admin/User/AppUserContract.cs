using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.Admin
{
    [DataContract]
    [Serializable]
    public class AppUserContract
    {
        [Key]
        [DataMember]
        public int AppUserContractID { get; set; }
        [DataMember]
        public int AppUserID { get; set; }
        [DataMember]
        public DateTime? TerminationDateUTC { get; set; }
        [DataMember]
        public DateTime? MovedToProductionUTC { get; set; }
        [DataMember]
        public DateTime StartDateUTC { get; set; }
        [DataMember]
        public int ContractTypeID { get; set; }
        [DataMember]
        public string CreatedBy { get; set; }
        [DataMember]
        public DateTime DateCreatedUTC { get; set; }
        [DataMember]
        public string UpdatedBy { get; set; }
        [DataMember]
        public DateTime LastUpdatedUTC { get; set; }
        [DataMember]
        public ContractType ContractType { get; set; }
    }
}

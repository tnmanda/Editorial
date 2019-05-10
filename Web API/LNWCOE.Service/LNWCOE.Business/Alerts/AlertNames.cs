using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.Alerts
{
    [DataContract]
    [Serializable]
    public class AlertNames
    {
        [Key]
        [DataMember]
        public int AlertNameID { get; set; }
        [DataMember]
        public int? AlertJobsID { get; set; }
        [DataMember]
        public string NameEntry { get; set; }
        [DataMember]
        public string SubDidivision { get; set; }
        [DataMember]
        public DateTime? EntryDateUTC { get; set; }
        [DataMember]
        public DateTime? DeletedDateUTC { get; set; }
        [DataMember]
        public long? id_mdb { get; set; }
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

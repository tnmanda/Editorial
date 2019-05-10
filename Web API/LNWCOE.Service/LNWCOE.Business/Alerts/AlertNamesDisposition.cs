using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;


namespace LNWCOE.Models.Alerts
{
    [DataContract]
    [Serializable]
    public class AlertNamesDisposition
    {
        [Key]
        [DataMember]
        public int AlertNamesDispositionID { get; set; }
        [DataMember]
        public int AppUserID { get; set; }
        [DataMember]
        public int EditTypeID { get; set; }
        [DataMember]
        public int DispositionTypeID { get; set; }
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

using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using LNWCOE.Models.Admin;

namespace LNWCOE.Models.BWQ
{
    [DataContract]
    [Serializable]
    public class Bwq
    {
        [Key]
        [DataMember]
        public int BWQID { get; set; }
        [DataMember]
        public int StatusCollectionItemID { get; set; }
        [DataMember]
        public int PriorityCollectionItemID { get; set; }
        [DataMember]
        public string BatchName { get; set; }
        [DataMember]
        public string BwqDescription { get; set; }
        [DataMember]
        public DateTime StartDateUTC { get; set; }
        [DataMember]
        public DateTime DueDateUTC { get; set; }
        [DataMember]
        public int OriginalCount { get; set; }
        [DataMember]
        public string CreatedBy { get; set; }
        [DataMember]
        public DateTime DateCreatedUTC { get; set; }
        [DataMember]
        public string UpdatedBy { get; set; }
        [DataMember]
        public DateTime LastUpdatedUTC { get; set; }

        /*
        [DataMember]
        public CollectionItem StatusCollection { get; set; }
        [DataMember]
        public CollectionItem PriorityCollection { get; set; }
        */
    }
}

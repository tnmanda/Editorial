using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.BWQ
{
    [DataContract]
    [Serializable]
    public class BWQEntities
    {
        [Key]
        [DataMember]
        public int BWQEntitiesID { get; set; }
        [DataMember]
        public int BWQID { get; set; }
        [DataMember]
        public int MMMEntityID { get; set; }
        [DataMember]
        public string EntityName { get; set; }
        [DataMember]
        public string CountryName { get; set; }
        [DataMember]
        public string CategoryName { get; set; }
        [DataMember]
        public Guid? WorkItemID { get; set; }
        [DataMember]
        public string CreatedBy { get; set; }
        [DataMember]
        public DateTime DateCreatedUTC { get; set; }
        [DataMember]
        public string UpdatedBy { get; set; }
        [DataMember]
        public DateTime LastUpdatedUTC { get; set; }
        [DataMember]
        public Bwq BWQ { get; set; }
    }
}

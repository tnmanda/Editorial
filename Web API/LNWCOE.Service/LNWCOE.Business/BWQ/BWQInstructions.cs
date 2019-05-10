using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.BWQ
{
    [DataContract]
    [Serializable]
    public class BWQInstructions
    {
        [Key]
        [DataMember]
        public int BWQInstructionsID { get; set; }
        [DataMember]
        public int BWQEntitiesID { get; set; }
        [DataMember]
        public int BWQDispositionsID { get; set; }
        [DataMember]
        public int BWQFieldSelectID { get; set; }
        [DataMember]
        public string Instructions { get; set; }
        [DataMember]
        public string CreatedBy { get; set; }
        [DataMember]
        public DateTime DateCreatedUTC { get; set; }
        [DataMember]
        public string UpdatedBy { get; set; }
        [DataMember]
        public DateTime LastUpdatedUTC { get; set; }
        [DataMember]
        public BWQEntities BWQEntities { get; set; }
        [DataMember]
        public BWQDispositions BWQDispositions { get; set; }
        [DataMember]
        public BWQFieldSelect BWQFieldSelect { get; set; }
    }
}

using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.MMM
{
    [DataContract]
    [Serializable]
    public class EntitiesSubCategories
    {
        [Key]
        [DataMember]
        public int SubCatID { get; set; }
        [DataMember]
        public string SubCatDesc { get; set; }
        [DataMember]
        public string SubCatDef { get; set; }
        [DataMember]
        public int? ShowOrder { get; set; }
    }
}

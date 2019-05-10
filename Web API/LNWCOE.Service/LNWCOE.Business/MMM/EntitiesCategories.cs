using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.MMM
{
    [DataContract]
    [Serializable]
    public class EntitiesCategories
    {
        [Key]
        [DataMember]
        public int ID { get; set; }
        [DataMember]
        public string EntryCategory { get; set; }
        [DataMember]
        public string EntryCategoryDesc { get; set; }
    }
}

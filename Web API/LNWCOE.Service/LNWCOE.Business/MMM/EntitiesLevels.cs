using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.MMM
{
    [DataContract]
    [Serializable]
    public class EntitiesLevels
    {
        [Key]
        [DataMember]
        public int LevelID { get; set; }
        [DataMember]
        public string LevelDesc { get; set; }
        [DataMember]
        public bool? HighLevel { get; set; }
    }
}

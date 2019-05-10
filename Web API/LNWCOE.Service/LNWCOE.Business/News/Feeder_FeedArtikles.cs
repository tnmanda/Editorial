using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.News
{
    [DataContract]
    [Serializable]
    public class Feeder_FeedArtikles
    {
        [Key]
        [DataMember]
        public int pkArtikleID { get; set; }
        [DataMember]
        public string URL { get; set; }
        [DataMember]
        public string Title { get; set; }
        [DataMember]
        public string ArtikleDescription { get; set; }
        [DataMember]
        public int fkFeedID { get; set; }
        [DataMember]
        public DateTime? DateAdded { get; set; }
        [DataMember]
        public byte[] UniqKey { get; set; }
        [DataMember]
        public byte[] UniqContent { get; set; }
        [DataMember]
        public byte[] UniqTitle { get; set; }
    }
}

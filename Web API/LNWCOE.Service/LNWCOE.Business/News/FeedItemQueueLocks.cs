using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace LNWCOE.Models.News
{
    [DataContract]
    [Serializable]
    public class FeedItemQueueLocks
    {
        [Key]
        [DataMember]
        public int ID { get; set; }
        [DataMember] 
        public int LockedByRecipientID { get; set; }
        [DataMember]
        public int fkItemID { get; set; }
        [DataMember]
        public DateTime DateTimeItemWasLocked { get; set; }
    }
}

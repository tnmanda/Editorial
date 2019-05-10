using System;
using System.Collections.Generic;
using System.Text;

namespace LNWCOE.Models.HR
{
    public class HRReturnValue
    {
        public string name { get; set; }
        public string description { get; set; }
        public object queue { get; set; }
        public string queueGuid { get; set; }
        public string workItemGuid { get; set; }
        public string statusDetailTypeName { get; set; }
        public string statusDetailTypeDescription { get; set; }
        public string statusDetailTypeGuid { get; set; }
        public string reviewTypeCode { get; set; }
        public string reviewTypeDescription { get; set; }
        public string reviewTypeGuid { get; set; }
        public string formDefinitionJson { get; set; }
        public List<object> payload { get; set; }
        public List<object> history { get; set; }
        public List<object> reviewers { get; set; }
        public bool isLocked { get; set; }
        public object lockedBy { get; set; }
        public object lockedDate { get; set; }
        public bool isActive { get; set; }
        public string url { get; set; }
        public string createdBy { get; set; }
        public DateTime dateCreatedUtc { get; set; }
        public string updatedBy { get; set; }
        public DateTime lastUpdatedUtc { get; set; }
    }
}

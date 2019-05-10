using System;

namespace LNWCOE.Models.HR
{
    public class WorkItemPutRequest 
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid? QueueGuid { get; set; }
        public string StatusDetailTypeGuid { get; set; }
        public string ReviewTypeGuid { get; set; }
        public string FormDefinitionJson { get; set; }
        public bool IsActive { get; set; }
        public string WorkitemGuid { get; set; }
    }
}

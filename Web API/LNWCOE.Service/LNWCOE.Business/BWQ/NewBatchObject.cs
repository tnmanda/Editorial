using System;
using System.Collections.Generic;
using LNWCOE.Models.MMM;

namespace LNWCOE.Models.BWQ
{
    public class NewBatchObject
    {
        public string Operation { get; set; }
        public string BatchName { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime DueDate { get; set; }
        public int PriorityCollectionItemID { get; set; }
        public int StatusCollectionItemID { get; set; }

        public List<Instruction> Instructions { get; set; }
        public List<EntityID> Ent_IDs { get; set; }

        public string Username { get; set; }
        public int OriginalCount { get; set; }

        public string ModuleGuid { get; set; }
        public string ApplicationGuid { get; set; }
        public string QueueGuid { get; set; }
        public string WorkItemGuid { get; set; }
        public string HRToken { get; set; }

    }
}

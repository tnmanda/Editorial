using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace LNWCOE.Models.HRData
{
    public class WorkItemRequest
    {
        public string name { get; set; }
        public string description { get; set; }
        public Guid? queueGuid { get; set; }
        public string statusDetailTypeGuid { get; set; }
        public string reviewTypeGuid { get; set; }
        public string formDefinitionJson { get; set; }
        public bool isActive { get; set; }
    }

    public class Value
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

    public class WorkItemData
    {
        public Value value { get; set; }
        public bool isSuccessful { get; set; }
        public List<object> errorMessages { get; set; }
    }

    public class WorkItemPostData
    {
        public string token { get; set; }
        public string ProfileId { get; set; }
        public int appuserid { get; set; }
        public int ModuleTableEntryID { get; set; }
        // This is the ID for specific table
        // BWQEntitiesID Column of BWQEntities table for BWQ
        // InvestigationID Column of Investigation table for Investigations
        // 
    }

    public class WorkItemPutRequest
    {
        public string name { get; set; }
        public string description { get; set; }
        public Guid? queueGuid { get; set; }
        public string statusDetailTypeGuid { get; set; }
        public string reviewTypeGuid { get; set; }
        public string formDefinitionJson { get; set; }
        public bool isActive { get; set; }
        public string workitemGuid { get; set; }
    }

}

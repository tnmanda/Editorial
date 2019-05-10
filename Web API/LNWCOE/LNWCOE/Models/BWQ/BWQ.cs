using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using Microsoft.SqlServer.Server;

namespace LNWCOE.Models.BWQ
{
    public class BWQ
    {
        [Key]
        public int BWQID { get; set; }
        public int StatusCollectionItemID { get; set; }
        public int PriorityCollectionItemID { get; set; }
        public string BatchName { get; set; }
        public string BwqDescription { get; set; }
        public DateTime StartDateUTC { get; set; }
        public DateTime DueDateUTC { get; set; }
        public int OriginalCount { get; set; }
        //public int Remaining { get; set; }
        //public float PercentComplete { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }
    }

    public class Instruction
    {
        public string BWQFieldSelectID { get; set; }
        public string Instructions { get; set; }
    }

    public class EntityID
    {
        public int Ent_ID { get; set; }
    }

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

    public class InstructionsCollection : List<Instruction>, IEnumerable<SqlDataRecord>
    {
        IEnumerator<SqlDataRecord> IEnumerable<SqlDataRecord>.GetEnumerator()
        {

            SqlDataRecord ret = new SqlDataRecord(
            new SqlMetaData("BWQFieldSelectID", SqlDbType.VarChar, 500),
            new SqlMetaData("Instructions", SqlDbType.VarChar, 500)
            );

            foreach (Instruction ins in this)
            {
                ret.SetString(0, ins.BWQFieldSelectID);
                ret.SetString(1, ins.Instructions);
                yield return ret;
            }

        }
    }

    public class EntitiesCollection : List<EntityID>, IEnumerable<SqlDataRecord>
    {
        IEnumerator<SqlDataRecord> IEnumerable<SqlDataRecord>.GetEnumerator()
        {

            SqlDataRecord ret = new SqlDataRecord(
            new SqlMetaData("Ent_ID", SqlDbType.Int)
            );

            foreach (EntityID ent in this)
            {
                ret.SetInt32(0, ent.Ent_ID);
                yield return ret;
            }

        }
    }
}

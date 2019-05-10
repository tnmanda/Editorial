using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LNWCOE.Models.BWQ
{
    public class BWQEntities
    {
        [Key]
        public int BWQEntitiesID { get; set; }
        public int BWQID { get; set; }
        public int MMMEntityID { get; set; }
        public string EntityName { get; set; }
        public string CountryName { get; set; }
        public string CategoryName { get; set; }
        public Guid? WorkItemID { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }

        public BWQ BWQ { get; set; }
    }

    public class BWQSingleEntity
    {
        [Key]
        public int BWQEntitiesID { get; set; }
        public int BWQID { get; set; }
        public int MMMEntityID { get; set; }
        public string EntityName { get; set; }
        public string CountryName { get; set; }
        public string CategoryName { get; set; }
        public Guid? WorkItemID { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }
        
    }
    /*
    public class BWQLock
    {
        [Key]
        public int MMMEntityID { get; set; }
        public bool bwqlock { get; set; }
        public bool bwqunlock { get; set; }
        public int WorkUnitTypeId { get; set; }
        
        //3	Investigation
	    //4	Alerts
	    //5	News Queue
	    //6	BWQ
    }
    */
}

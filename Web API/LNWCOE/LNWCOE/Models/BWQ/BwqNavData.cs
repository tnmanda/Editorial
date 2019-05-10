using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.BWQ
{
    public class BwqNavData
    {
        [Key]
        public int FunctionTypeID { get; set; }
        public string FunctionTypeName { get; set; }
        public int MMMEntityID { get; set; }
        public int CountryID { get; set; }
        public string CountryName { get; set; }
        public int BWQID { get; set; }
        public string BatchName { get; set; }
        public int StatusCollectionItemID { get; set; }
        public DateTime StartDateUTC{ get; set; }
    }

    public class BwqNavDataWithUser
    {
        [Key]
        public int FunctionTypeID { get; set; }
        public string FunctionTypeName { get; set; }
        public int MMMEntityID { get; set; }
        public int CountryID { get; set; }
        public string CountryName { get; set; }
        public int BWQID { get; set; }
        public string BatchName { get; set; }
        public int StatusCollectionItemID { get; set; }
        public DateTime StartDateUTC { get; set; }
        public int? AppUserId { get; set; } 
        public int Aging { get; set; }
    }

}

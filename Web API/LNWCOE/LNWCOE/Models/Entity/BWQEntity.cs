using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models
{
    // BWQ Entity listing (grid data)
    public class BWQEntity
    {
        [Key]
        public int BWQEntitiesId { get; set; }
        public string EntityName { get; set; }
        public int MMMEntityId { get; set; }
        public int BatchCount { get; set; }
        public int OriginalCount { get; set; }
        public string BatchName { get; set; }
        public string Priority { get; set; }
        public string CountryName { get; set; }
        public string CategoryName { get; set; }
        public DateTime? StartDateUTC { get; set; }
        public string LockedBy { get; set; }
        public DateTime? LockedAt { get; set; }

    }

    // Filter Class to retrieve BWQ entities
    public class BWQEntityFilter
    {
        [Key]
        public string countryName { get; set; }
        public string categoryName { get; set; }
        public string batchName { get; set; }
        public bool aging { get; set; }
        public string appUserID { get; set; }
    }

}
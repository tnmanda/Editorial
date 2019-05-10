using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.BWQ
{
    public class BWQEntityData
    {
        [Key]
        public int BWQEntitiesId { get; set; }
        public string EntityName { get; set; }
        public int? MMMEntityId { get; set; }
        public int? BatchCount { get; set; }
        public int? OriginalCount { get; set; }
        public string BatchName { get; set; }
        public string Priority { get; set; }
        public string CountryName { get; set; }
        public string CategoryName { get; set; }
        public DateTime? StartDateUTC { get; set; }
        public string LockedBy { get; set; }
        public DateTime? LockedAt { get; set; }
    }
}

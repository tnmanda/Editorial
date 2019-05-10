using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.BWQ
{
    public class Collection
    {
        [Key]
        public int CollectionID { get; set; }
        public string CollectionName { get; set; }
        public string CollectionDescription { get; set; }
        public int SortOrder { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }
    }
}

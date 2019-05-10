using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LNWCOE.Models.BWQ
{
    public class CollectionItem
    {
        [Key]
        public int CollectionItemID { get; set; }
        public int CollectionID { get; set; }
        public int SortOrder { get; set; }
        public string ItemText { get; set; }
        public string ItemValue { get; set; }
        public string ItemDescription { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }

        public Collection Collection { get; set; }
    }
}

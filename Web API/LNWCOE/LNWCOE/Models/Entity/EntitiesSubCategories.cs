using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Entity
{
    public class EntitiesSubCategories
    {
        [Key]
        public int SubCatID { get; set; }
        public string SubCatDesc { get; set; }
        public string SubCatDef { get; set; }
        public int? ShowOrder { get; set; }
    }

}

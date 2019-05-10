using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Entity
{
    public class EntitiesCategories
    {
        [Key]
        public int ID { get; set; }
        public string EntryCategory { get; set; }
        public string EntryCategoryDesc { get; set; }
    }

}

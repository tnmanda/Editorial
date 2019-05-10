using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Entity
{
    public class EntitiesLevels
    {
        [Key]
        public int LevelID { get; set; }
        public string LevelDesc { get; set; }
        public bool? HighLevel { get; set; }
    }

}

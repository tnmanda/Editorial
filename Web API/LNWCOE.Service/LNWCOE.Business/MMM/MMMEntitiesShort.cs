using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.MMM
{
    public class MMMEntitiesShort
    {
        [Key]
        public int Ent_ID { get; set; }
        public string Name { get; set; }
        public string EntryCategory { get; set; }
        public string EntrySubCategory { get; set; }
        public string Country { get; set; }
    }
}

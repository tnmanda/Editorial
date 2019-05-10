using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.BWQ
{
    public class BWQEntityFilter
    {
        [Key]
        public string CountryName { get; set; }
        public string CategoryName { get; set; }
        public string BatchName { get; set; }
        public bool Aging { get; set; }
        public string AppUserID { get; set; }
    }
}

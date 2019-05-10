using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Investigations
{
    public class InvestigationFilter
    {
        [Key]
        public string countryName { get; set; }
        public string categoryName { get; set; }
        public string batchName { get; set; }
        public bool aging { get; set; }
        public string appUserID { get; set; }

    }
}

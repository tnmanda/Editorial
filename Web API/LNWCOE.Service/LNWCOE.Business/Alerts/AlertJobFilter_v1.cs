using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Alerts
{
    public class AlertJobFilter_v1
    {
        [Key]
        public int CountryID { get; set; }
        public int AlertJobsID { get; set; }
    }
}

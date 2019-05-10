using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Alerts
{
    public class AlertJobFilter
    {
        [Key]
        public int AlertJobQueueID { get; set; }
        public string DueDate { get; set; }
    }
}

using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Alerts
{
    public class AlertJobsNav_v1
    {
        [Key]
        public int AlertJobsID { get; set; }
        public string JobName { get; set; }
        public int CountryID { get; set; }
        public string CountryName { get; set; }
    }
}

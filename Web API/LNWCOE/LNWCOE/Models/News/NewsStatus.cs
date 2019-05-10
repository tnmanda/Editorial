using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.News
{
    public class NewsStatus
    {
        [Key]
        public int NewsStatusID { get; set; }
        public int NewsStatusValue { get; set; }
        public string NewsStatusDescription { get; set; }
        public int NewsState { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }
    }
}

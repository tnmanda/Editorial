using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LNWCOE.Models.INV
{
    public class InvestigationEmails
    {
        [Key]
        public int InvestigationEmailID { get; set; }
        public int InvestigationID { get; set; }
        public int AppUserID { get; set; }
        public string SentTo { get; set; }
        public string SentFrom { get; set; }
        public string Subject { get; set; }
        public string EmailBody { get; set; }
        public DateTime SentDateUTC { get; set; }
        public string StatusOrErrorMessage { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }
    }

}

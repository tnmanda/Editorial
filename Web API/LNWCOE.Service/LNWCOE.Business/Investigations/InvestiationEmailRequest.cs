using System;
using System.Collections.Generic;
using System.Text;

namespace LNWCOE.Models.Investigations
{
    public class InvestiationEmailRequest
    {
        public int AppUserID { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
        public string RecipientEmail { get; set; }
        public int IndexFromWorkTable { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Text;

namespace LNWCOE.Models.Investigations
{
    public class InvestigationDataSave
    {
        public Investigation Investigation { get; set; }
        public string HRToken { get; set; }
        public InvestigationNote InvestigationNote { get; set; }
    }

}

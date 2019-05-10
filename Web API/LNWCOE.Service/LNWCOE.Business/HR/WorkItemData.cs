using System;
using System.Collections.Generic;
using System.Text;

namespace LNWCOE.Models.HR
{
    public class WorkItemData
    {
        public HRReturnValue Value { get; set; }
        public bool isSuccessful { get; set; }
        public List<object> errorMessages { get; set; }
    }
}

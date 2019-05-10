using System;
using System.Collections.Generic;
using System.Text;

namespace LNWCOE.Models.Admin
{
    public class LockEntry
    {
        public int WorkUnitTypeID { get; set; }
        public int AppUserID { get; set; }
        public int IDFromWorkUnitsDBTable { get; set; }
    }
}

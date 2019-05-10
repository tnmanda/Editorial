using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LNWCOE.Models.Auth
{
    public class LoginInfo
    {
        public string domain { get; set; }
        public string userName { get; set; }
        public string password { get; set; }
        public string groupcode { get; set; }
    }
}

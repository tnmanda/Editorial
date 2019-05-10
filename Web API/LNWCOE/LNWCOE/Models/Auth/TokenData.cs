using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LNWCOE.Models.Auth
{
    public class TokenData
    {
        public string token { get; set; }
        public DateTime expiration { get; set; }
    }
}

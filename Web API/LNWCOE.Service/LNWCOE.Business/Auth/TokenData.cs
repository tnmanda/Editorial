using System;

namespace LNWCOE.Models.Auth
{
    public class TokenData
    {
        public string token { get; set; }
        public DateTime expiration { get; set; }
    }
}

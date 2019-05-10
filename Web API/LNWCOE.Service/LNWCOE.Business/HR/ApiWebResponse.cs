using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace LNWCOE.Models.HR
{
    public class ApiWebResponse
    {
        public WebResponse Response { get; set; }
        public int StatusCode { get; set; }
        public string Message { get; set; }
    }
}

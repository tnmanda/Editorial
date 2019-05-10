using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Admin.Misc
{
    public class LogTable
    {
        [Key]
        public long LogTableID { get; set; }
        public DateTime DateUTC { get; set; }
        public string Thread { get; set; }
        public byte Level { get; set; }
        public string Logger { get; set; }
        public string Message { get; set; }
        public string Exception { get; set; }
        public string ExtraData { get; set; }
    }

}

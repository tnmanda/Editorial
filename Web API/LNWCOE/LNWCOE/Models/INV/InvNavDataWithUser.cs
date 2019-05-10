using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.INV
{
    public class InvNavDataWithUser
    {
        [Key]
        public int InvestigationID { get; set; }
        public string InvestigationName { get; set; }
        public string Priority { get; set; }
        public string Country { get; set; }
        public string Function { get; set; }
        public string Disposition { get; set; }
        public int? MMMDDUsersID { get; set; }
        public int? User { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public int Aging { get; set; }

    }
}





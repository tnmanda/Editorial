using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LNWCOE.Models.INV
{
    public class InvestigationEntity
    {
        [Key]
        public int InvestigationEntityID { get; set; }
        public int InvestigationID { get; set; }
        public int? Ent_ID { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }
    }

}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.BWQ
{
    public class BWQInstructions
    {
        [Key]
        public int BWQInstructionsID { get; set; } 
        public int BWQEntitiesID { get; set; }
        public int BWQDispositionsID { get; set; }
        public int BWQFieldSelectID { get; set; }
        public string Instructions { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }

        public BWQEntities BWQEntities { get; set; }
        public BWQDispositions BWQDispositions { get; set; }
        public BWQFieldSelect BWQFieldSelect { get; set; }
    }

    public class BWQInstructionsData 
    {
        public List<BWQInstructions> instructions { get; set; }
        public string HRToken { get; set; }
    }
}

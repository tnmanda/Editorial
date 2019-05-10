using System;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.INV
{
    public class InvestigationNote
    {
        public int InvestigationNoteID { get; set; }
        public int InvestigationID { get; set; }
        public string NoteText { get; set; }
        public string CreatedBy { get; set; }
        public DateTime DateCreatedUTC { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime LastUpdatedUTC { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LNWCOE.Models.BWQ
{
    public class EntityLookup
    {
        public string DateEnteredFrom { get; set;}
        public string DateEnteredTo { get; set;}
        public string DateUpdatedFrom { get; set;}
        public string DateUpdatedTo { get; set;}
        public string LastReviewedDateFrom { get; set;}
        public string LastReviewedDateTo { get; set;}
        public string EnteredBy { get; set;}
        public string UpdatedBy { get; set;}
        public string ReviewedBy { get; set;}
        public string DOB { get; set;}
        public string DOB2 { get; set;}
        public string NationalID { get; set;}
        public string OtherID { get; set;}
        public string PassportID { get; set;}
        public string Positions { get; set;}
        public string Remarks { get; set;}
        public string EntitiesSourceID { get; set;}
        public string CountryID { get; set;}
        public string EntryCategoryID { get; set;}
        public string EntrySubCategoryID { get; set;}
        public string EntitiesLevelsId { get; set; }
    }
}

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LNWCOE.Models.Admin.Pages
{
    public class PageGrouped
    {
        [Key]
        public string PageGroup { get; set; }
        public List<PagesEx> Pages { get; set; }
    }
}

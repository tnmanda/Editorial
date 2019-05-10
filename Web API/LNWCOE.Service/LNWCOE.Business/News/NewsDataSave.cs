using System;
using System.Collections.Generic;
using System.Text;

namespace LNWCOE.Models.News
{
    public class NewsDataSave
    {
        public FeedItemQueue FeedItemQueue { get; set; }
        public string HRToken { get; set; }
        public Guid WorkItemGuid { get; set; }
    }
}

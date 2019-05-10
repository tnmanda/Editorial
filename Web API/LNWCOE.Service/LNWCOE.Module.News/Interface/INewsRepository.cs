using System;
using System.Collections.Generic;
using LNWCOE.Models.Admin;
using LNWCOE.Models.HR;
using LNWCOE.Models.News;
using Microsoft.Extensions.Configuration;
using Repository.DataAccess;

namespace LNWCOE.Module.News.Interface
{
    public interface INewsRepository : IRepository<NewsData>
    {
        object GetNewsNavigation(int appuserid, IConfiguration configuration);
        object GetFilteredNewsNavigation(NewsFilter filter, IConfiguration configuration);
        object CheckNewsWorkItemID(WorkItemPostData postData, IConfiguration configuration);
        object GetNewsEntryByGuid(Guid guid);
        NewsData SearchNewsQueueEntryById(int newsqentryid, IConfiguration configuration);
        LockEntry LockNewsItem(LockEntry lockentry);
        LockEntry UnLockNewsItem(LockEntry lockentry);
        

    }
}

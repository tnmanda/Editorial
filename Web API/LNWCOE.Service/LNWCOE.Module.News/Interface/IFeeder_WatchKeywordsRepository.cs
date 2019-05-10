using System.Collections.Generic;
using LNWCOE.Models.News;
using Repository.DataAccess;

namespace LNWCOE.Module.News.Interface
{
    public interface IFeeder_WatchKeywordsRepository : IRepository<Feeder_WatchKeywords>
    {
        Feeder_WatchKeywords CreateFeeder_WatchKeyword(Feeder_WatchKeywords watchkeyword);
        Feeder_WatchKeywordsBatch CreateFeeder_WatchKeywords(Feeder_WatchKeywordsBatch watchkeyword);
        object GetByWatchId(int watchid);
    }
}

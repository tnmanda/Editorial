using LNWCOE.Models.News;
using Microsoft.Extensions.Configuration;
using Repository.DataAccess;

namespace LNWCOE.Module.News.Interface
{
    public interface IFeedItemQueueRepository : IRepository<FeedItemQueue>
    {
        object UpdateNewsEntity(NewsDataSave newsdata, IConfiguration configuration);
    }
}

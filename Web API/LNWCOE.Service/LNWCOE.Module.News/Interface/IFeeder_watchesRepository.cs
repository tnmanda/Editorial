using System.Collections.Generic;
using LNWCOE.Models.News;
using Repository.DataAccess;

namespace LNWCOE.Module.News.Interface
{
    public interface IFeeder_watchesRepository : IRepository<Feeder_watches>
    {
        object GetAllWatchesWithLanguage();
        object GetAllWatchesByIDWithLanguage(int id);
        Feeder_watches AddNewWatch(Feeder_watches watch);
        Feeder_watches UpdateWatch(Feeder_watches watch);
        Feeder_watches DeleteWatch(int watchid);
    }

}

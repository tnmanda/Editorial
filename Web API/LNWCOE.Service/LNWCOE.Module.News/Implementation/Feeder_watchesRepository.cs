using System.Collections.Generic;
using System.Linq;
using LNWCOE.Models.Context;
using LNWCOE.Models.News;
using LNWCOE.Module.News.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.News.Implementation
{
    public class Feeder_watchesRepository : Repository<Feeder_watches>, IFeeder_watchesRepository
    {
        private new readonly EditorialDataContext _context;
        private readonly NewsFeedDataContext _newscontext;


        public Feeder_watchesRepository(EditorialDataContext context, NewsFeedDataContext newscontext) : base(context)
        {
            _context = context;
            _newscontext = newscontext;
        }

        public object GetAllWatchesWithLanguage()
        {
            var Watches = _newscontext.Feeder_watches.ToList();
            var Languages = _context.LanguageType.ToList();

            var result = (from watch in Watches
                       join langs in Languages on watch.FkLanguageID equals langs.LanguageTypeID
                       select new
                       {
                            watch.PkWatchID,
                            watch.Caption,
                            watch.Description,
                            watch.InArtikleTitle,
                            watch.InArtikleDescription,
                            watch.WholeWords,
                            watch.MAtchAllKeywords,
                            watch.FkLanguageID,
                            watch.Comments,
                            watch.LastFilterDate,
                           Language = new
                           {
                                langs.LanguageTypeID,
                                langs.LanguageTypeName,
                                langs.LanguageTypeDesc,
                                langs.IsInList,
                                langs.IsActive,
                                langs.CreatedBy,
                                langs.DateCreatedUTC,
                                langs.UpdatedBy,
                                langs.LastUpdatedUTC
                           }
                       });
            return result;

        }

        public object GetAllWatchesByIDWithLanguage(int id)
        {
            var Watches = _newscontext.Feeder_watches.Where(x => x.PkWatchID == id).ToList();
            var Languages = _context.LanguageType.ToList();

            var resultset = (from watch in Watches
                          join langs in Languages on watch.FkLanguageID equals langs.LanguageTypeID
                          select new
                          {
                              watch.PkWatchID,
                              watch.Caption,
                              watch.Description,
                              watch.InArtikleTitle,
                              watch.InArtikleDescription,
                              watch.WholeWords,
                              watch.MAtchAllKeywords,
                              watch.FkLanguageID,
                              watch.Comments,
                              watch.LastFilterDate,
                              Language = new
                              {
                                  langs.LanguageTypeID,
                                  langs.LanguageTypeName,
                                  langs.LanguageTypeDesc,
                                  langs.IsInList,
                                  langs.IsActive,
                                  langs.CreatedBy,
                                  langs.DateCreatedUTC,
                                  langs.UpdatedBy,
                                  langs.LastUpdatedUTC
                              }
                          });

            var result = resultset.FirstOrDefault();

            return result;
        }

        public Feeder_watches AddNewWatch(Feeder_watches watch)
        {

            var RecordID = _newscontext.Feeder_watches.Max(id => id.PkWatchID);
            watch.PkWatchID = RecordID + 1;

            _newscontext.Feeder_watches.Add(watch);
            _newscontext.SaveChanges();

            return(watch);

        }

        public Feeder_watches UpdateWatch(Feeder_watches watch)
        {
            var targetObject = _newscontext.Feeder_watches.FirstOrDefault(t => t.PkWatchID == watch.PkWatchID);
            if (targetObject == null)
            {
                return null;
            }
            _newscontext.Entry(targetObject).CurrentValues.SetValues(watch);
            _newscontext.SaveChanges();

            return watch;
        }

        public Feeder_watches DeleteWatch(int watchid)
        {
            var targetObject = _newscontext.Feeder_watches.FirstOrDefault(t => t.PkWatchID == watchid);
            if (targetObject == null)
            {
                return null;
            }
            _newscontext.Feeder_watches.Remove(targetObject);
            _newscontext.SaveChanges();

            return targetObject;
        }
    }
}

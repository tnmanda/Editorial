using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using LNWCOE.Models.Context;
using LNWCOE.Models.News;
using LNWCOE.Module.News.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.News.Implementation
{
    public class Feeder_WatchKeywordsRepository : Repository<Feeder_WatchKeywords>, IFeeder_WatchKeywordsRepository
    {
        private new readonly NewsFeedDataContext _context;

        public Feeder_WatchKeywordsRepository(NewsFeedDataContext context) : base(context)
        {
            _context = context;
        }

        public Feeder_WatchKeywords CreateFeeder_WatchKeyword(Feeder_WatchKeywords watchkeyword)
        {

            var RecordID = _context.Feeder_WatchKeywords.Max(id => id.pkKeywordID);
            watchkeyword.pkKeywordID = RecordID + 1;

            if (_context.Feeder_WatchKeywords.FirstOrDefault(x => x.Keyword == watchkeyword.Keyword) != null) // keyword exists
            {
                return (null);
            }
            _context.Feeder_WatchKeywords.Add(watchkeyword);
            _context.SaveChanges();

            return (watchkeyword);

        }

        public Feeder_WatchKeywordsBatch CreateFeeder_WatchKeywords(Feeder_WatchKeywordsBatch watchkeywords)
        {
            string Separator = watchkeywords.KeywordsSeparator;
            List<string> Keywords;

            Keywords = watchkeywords.Keywords.Split(Separator, StringSplitOptions.RemoveEmptyEntries).ToList();

            /*
            if (Separator == ":")
            {
                //var StringWithNewLine = watchkeywords.Keywords.Replace("\\n", "\\\\n");
                //Keywords = watchkeywords.Keywords.Split(new[] { '\r', '\n', '\t', ' '}, StringSplitOptions.RemoveEmptyEntries).ToList();
                
                Keywords = watchkeywords.Keywords.Split(new[] { Environment.NewLine, Environment. }, StringSplitOptions.RemoveEmptyEntries).ToList();


            }
            else
            {
                Keywords = watchkeywords.Keywords.Split(Separator).ToList();
            }
            */


            watchkeywords.Keywords = "";

            foreach (var Keyword in Keywords)
            {
                if (_context.Feeder_WatchKeywords.FirstOrDefault(x => x.Keyword == Keyword) != null) // keyword exists
                {
                    continue;
                }
                if(Keyword.Trim() == "")
                {
                    continue;
                }

                var NewWatchKeyword = new Feeder_WatchKeywords();

                var RecordID = _context.Feeder_WatchKeywords.Max(id => id.pkKeywordID);
                NewWatchKeyword.pkKeywordID = RecordID + 1;
                NewWatchKeyword.Keyword = Keyword.Trim();
                NewWatchKeyword.fkWatchID = watchkeywords.fkWatchID;
                NewWatchKeyword.DateAdded = DateTime.UtcNow;


                _context.Feeder_WatchKeywords.Add(NewWatchKeyword);
                watchkeywords.Keywords += Keyword + Separator;
                _context.SaveChanges();
            }

            return watchkeywords;
        }

        public object GetByWatchId(int watchid)
        {

            //var result = _context.Feeder_WatchKeywords.Where(x => x.fkWatchID == watchid);

            var result = (from watchkeywords in _context.Feeder_WatchKeywords
                          join watches in _context.Feeder_watches on watchkeywords.fkWatchID equals watches.PkWatchID
                          where watches.PkWatchID == watchid
                          select new {
                              watchkeywords.pkKeywordID,
                              watchkeywords.Keyword,
                              watchkeywords.fkWatchID,
                              watches.Caption,
                              watchkeywords.EngTran,
                              watchkeywords.DateAdded
                          }
                          );


            return (result);

        }
    }
}

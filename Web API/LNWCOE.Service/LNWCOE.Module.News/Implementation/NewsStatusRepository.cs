using LNWCOE.Models.Context;
using LNWCOE.Models.News;
using LNWCOE.Module.News.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.News.Implementation
{
    public class NewsStatusRepository : Repository<NewsStatus>, INewsStatusRepository
    {
        private new readonly EditorialDataContext _context;

        public NewsStatusRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }
    }
}

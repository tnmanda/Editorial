using System.Collections.Generic;
using System.Linq;
using LNWCOE.Models.Alerts;
using LNWCOE.Models.Context;
using LNWCOE.Module.Alerts.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.Alerts.Implementation
{
    public class EncodingRepository : Repository<Encoding>, IEncodingRepository
    {
        private new readonly EditorialDataContext _context;

        public EncodingRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }

        public Encoding GetByName(string name)
        {
            var query = base.GetAll()
                .Where(x => x.EncodingName == name)
                .FirstOrDefault();
            return query;
        }
    }
}

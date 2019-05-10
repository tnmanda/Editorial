using LNWCOE.Models.Admin;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Implementation
{
    public class CountryRepository : Repository<Country>, ICountryRepository
    {
        private new readonly EditorialDataContext _context;

        public CountryRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }
    }

}

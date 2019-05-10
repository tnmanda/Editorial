using System.Collections.Generic;
using System.Linq;
using LNWCOE.Models.BWQ;
using LNWCOE.Models.Context;
using LNWCOE.Module.BWQ.Interface;
using Microsoft.EntityFrameworkCore;
using Repository.DataAccess;
//using Newtonsoft.Json.Linq;

namespace LNWCOE.Module.BWQ.Implementation
{
    public class BwqNavDataWithUserRepository : Repository<BwqNavDataWithUser>, IBwqNavDataWithUserRepository
    {
        private new readonly EditorialDataContext _context;

        public BwqNavDataWithUserRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }
    }
}
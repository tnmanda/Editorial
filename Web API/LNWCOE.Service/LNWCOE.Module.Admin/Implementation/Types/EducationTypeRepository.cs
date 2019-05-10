﻿using LNWCOE.Models.Admin;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Implementation
{
    public class EducationTypeRepository : Repository<EducationType>, IEducationTypeRepository
    {
        private new readonly EditorialDataContext _context;

        public EducationTypeRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }
    }

}

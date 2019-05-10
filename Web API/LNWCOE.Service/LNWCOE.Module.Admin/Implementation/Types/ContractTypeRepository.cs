﻿using LNWCOE.Models.Admin;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Implementation
{
    public class ContractTypeRepository : Repository<ContractType>, IContractTypeRepository
    {
        private new readonly EditorialDataContext _context;

        public ContractTypeRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }
    }

}

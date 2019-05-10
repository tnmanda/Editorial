using System;
using System.Collections.Generic;
using LNWCOE.Models.BWQ;
using LNWCOE.Models.HR;
using Microsoft.Extensions.Configuration;
using Repository.DataAccess;

namespace LNWCOE.Module.BWQ.Interface
{
    public interface IBWQInstructionsRepository : IRepository<BWQInstructions>
    {
        BWQInstructions GetIdIncluding(int id);
        IEnumerable<BWQInstructions> GetAllIncludingByName();
        object UpdateInstruction(BWQInstructionsData editentry, IConfiguration configuration);
    }
}

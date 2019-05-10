using System;
using System.Collections.Generic;
using LNWCOE.Models.BWQ;
using LNWCOE.Models.HR;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Repository.DataAccess;

namespace LNWCOE.Module.BWQ.Interface
{
    public interface IBWQEntitiesRepository : IRepository<BWQEntities>
    {
        BWQEntities GetIdIncluding(int id);
        IEnumerable<BWQEntities> GetAllIncludingByName();
        IEnumerable<BWQEntityData> FilterBWQEntities(BWQEntityFilter filter);
        object GetWorkItemID(WorkItemPostData wrkItemData, IConfiguration configuration);
        object GetInstructionsByGuid(Guid guid);

        object GetEntitiesFromFile(IFormFile file);
    }
}

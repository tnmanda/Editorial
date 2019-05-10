using System.Collections.Generic;
using LNWCOE.Models.BWQ;
using LNWCOE.Models.MMM;
using Repository.DataAccess;

namespace LNWCOE.Module.BWQ.Interface
{
    public interface IEntitiesRepository : IRepository<Entities>
    {
        //System.Threading.Tasks.Task<List<MMMEntitiesShort>> GetMMMEntitiesAsync(EntityLookup lookup);
        List<MMMEntitiesShort> GetMMMEntitiesAsync(EntityLookup lookup);
        Entities GetEntityByName(MMMEntityName profileName);

    }
}

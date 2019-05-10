using LNWCOE.Models.BWQ;
using Microsoft.Extensions.Configuration;
using Repository.DataAccess;

namespace LNWCOE.Module.BWQ.Interface
{
    public interface IBWQRepository : IRepository<Bwq>
    {
        object GetNavCountsWithUser(int appuserid);
        object CreateNewBatch(NewBatchObject newbatch, IConfiguration configuration);

        object GetBWQEntries();
        object GetById(int id);
    }
}


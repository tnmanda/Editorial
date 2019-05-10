using System.Collections.Generic;
using LNWCOE.Models.Alerts;
using Repository.DataAccess;

namespace LNWCOE.Module.Alerts.Interface
{
    public interface IAlertNamesRepository : IRepository<AlertNames>
    {
        IEnumerable<AlertNames> GetByJobID(int id); 
    }
}

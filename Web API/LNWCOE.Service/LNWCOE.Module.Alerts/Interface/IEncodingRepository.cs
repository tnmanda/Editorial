using System.Collections.Generic;
using LNWCOE.Models.Alerts;
using Repository.DataAccess;

namespace LNWCOE.Module.Alerts.Interface
{
    public interface IEncodingRepository : IRepository<Encoding>
    {
        Encoding GetByName(string name);
    }
}


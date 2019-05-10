using System.Collections.Generic;
using System.Data;
using Microsoft.SqlServer.Server;

namespace LNWCOE.Models.MMM
{
    public class EntitiesCollection : List<EntityID>, IEnumerable<SqlDataRecord>
    {
        IEnumerator<SqlDataRecord> IEnumerable<SqlDataRecord>.GetEnumerator()
        {

            SqlDataRecord ret = new SqlDataRecord(
            new SqlMetaData("Ent_ID", SqlDbType.Int)
            );

            foreach (EntityID ent in this)
            {
                ret.SetInt32(0, ent.Ent_ID);
                yield return ret;
            }

        }
    }
}

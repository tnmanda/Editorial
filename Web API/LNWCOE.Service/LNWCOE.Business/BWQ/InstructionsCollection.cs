using System.Collections.Generic;
using System.Data;
using Microsoft.SqlServer.Server;

namespace LNWCOE.Models.BWQ
{
    public class InstructionsCollection : List<Instruction>, IEnumerable<SqlDataRecord>
    {
        IEnumerator<SqlDataRecord> IEnumerable<SqlDataRecord>.GetEnumerator()
        {

            SqlDataRecord ret = new SqlDataRecord(
            new SqlMetaData("BWQFieldSelectID", SqlDbType.VarChar, 500),
            new SqlMetaData("Instructions", SqlDbType.VarChar, 500)
            );

            foreach (Instruction ins in this)
            {
                ret.SetString(0, ins.BWQFieldSelectID);
                ret.SetString(1, ins.Instructions);
                yield return ret;
            }

        }
    }
    

}

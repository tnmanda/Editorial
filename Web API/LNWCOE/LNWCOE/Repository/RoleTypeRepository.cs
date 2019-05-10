using System.Linq;
using System.Threading.Tasks;
using LNWCOE.Models.Admin;
using LNWCOE.Interface;
using LNWCOE.Data;

namespace LNWCOE.Repository
{
    public class RoleTypeRepository : GenericRepository<RoleType>, IRoleTypeRepository
    {
        public RoleTypeRepository(AppDbContext context) : base(context)
        {
        }
    }

}

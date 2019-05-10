using LNWCOE.Models.Admin;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Repository.DataAccess;

namespace LNWCOE.Module.Admin.Implementation
{
    public class AssignmentTypeRepository : Repository<AssignmentType>, IAssignmentTypeRepository
    {
        private new readonly EditorialDataContext _context;

        public AssignmentTypeRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }
    }
}

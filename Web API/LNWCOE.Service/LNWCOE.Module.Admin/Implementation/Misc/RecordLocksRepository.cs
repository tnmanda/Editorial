using LNWCOE.Models.Admin;
using LNWCOE.Models.Context;
using LNWCOE.Module.Admin.Interface;
using Repository.DataAccess;
using System;
using System.Linq;

namespace LNWCOE.Module.Admin.Implementation
{
    public class RecordLocksRepository : Repository<RecordLocks>, IRecordLocksRepository
    {
        private new readonly EditorialDataContext _context;

        public RecordLocksRepository(EditorialDataContext context) : base(context)
        {
            _context = context;
        }

        public string Lock(LockEntry newlock)
        {
            string Message = "";

            var existingLock = _context.RecordLocks
                        .FirstOrDefault(x => (x.IDFromWorkUnitsDBTable == newlock.IDFromWorkUnitsDBTable
                        && x.WorkUnitTypeID == newlock.WorkUnitTypeID));

            if (existingLock != null)
            {
                Message = "Lock already exists for record";
                return Message;
            }

            RecordLocks thisLock = new RecordLocks
            {
                AppUserID = newlock.AppUserID,
                IDFromWorkUnitsDBTable = newlock.IDFromWorkUnitsDBTable,
                WorkUnitTypeID = newlock.WorkUnitTypeID,
                DateTimeItemWasLockedUTC = DateTime.UtcNow,

                CreatedBy = newlock.AppUserID.ToString(),
                DateCreatedUTC = DateTime.UtcNow,
                UpdatedBy = newlock.AppUserID.ToString(),
                LastUpdatedUTC = DateTime.UtcNow
            };

            var result = base.Add(thisLock);

            if (result != null)
            {
                Message = "Record Locked";
                return Message;
            }

            return Message;
        }

        public string Unlock(LockEntry thislock)
        {
            string Message = "";

            var todelete = _context.RecordLocks
                .FirstOrDefault(t => t.WorkUnitTypeID == thislock.WorkUnitTypeID
                    && t.IDFromWorkUnitsDBTable == thislock.IDFromWorkUnitsDBTable
                    && t.AppUserID == thislock.AppUserID);

            if (todelete == null)
            {
                Message = "Record Not Found";
                return Message;
            }

            base.Delete(todelete);

            Message = "Record Unlocked";

            return Message;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LNWCOE.Data;
using LNWCOE.Models.Admin;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.Extensions.Logging;
using LNWCOE.Helpers;
using Microsoft.EntityFrameworkCore;

namespace LNWCOE.Modules.Admin
{
    [Produces("application/json")]
    [Route("api/RecordLocks")]
    [Authorize]
    public class RecordLocksController : Controller
    {
        private readonly AppDbContext _context;
        private readonly MMMDBContext _mmmcontext;
        private readonly ILogger<RecordLocksController> _logger;

        public RecordLocksController(AppDbContext context, MMMDBContext mmmcontext, ILogger<RecordLocksController> logger)
        {
            this._context = context;
            this._mmmcontext = mmmcontext;
            this._logger = logger;
        }


        [HttpPost]
        public IActionResult Lock([FromBody] LockEntry newmodel)
        {
            if (ModelState.IsValid)
            {
                if (newmodel != null)
                {
                    /*
                    var Entity = _mmmcontext.Entities.FirstOrDefault(x => x.Ent_ID == newmodel.IDFromWorkUnitsDBTable);
                    
                    if (Entity == null)
                    {
                        return BadRequest("Profile not found with Id " + newmodel.IDFromWorkUnitsDBTable);
                    }
                    */

                    // look for an existing lock
                    var existingLock = _context.RecordLocks
                        .FirstOrDefault(x => (x.IDFromWorkUnitsDBTable == newmodel.IDFromWorkUnitsDBTable && x.WorkUnitTypeID == newmodel.WorkUnitTypeID));
                    //.FirstOrDefault(x => (x.IDFromWorkUnitsDBTable == newmodel.IDFromWorkUnitsDBTable && x.AppUserID == newmodel.AppUserID && x.WorkUnitTypeID == newmodel.WorkUnitTypeID));
                    if (existingLock != null)
                    {
                        return BadRequest("Lock already exists for record");
                    }

                    RecordLocks thisLock = new RecordLocks();
                    thisLock.AppUserID = newmodel.AppUserID;
                    thisLock.IDFromWorkUnitsDBTable = newmodel.IDFromWorkUnitsDBTable;
                    thisLock.WorkUnitTypeID = newmodel.WorkUnitTypeID;
                    thisLock.DateTimeItemWasLockedUTC = DateTime.UtcNow;

                    thisLock.CreatedBy = newmodel.AppUserID.ToString();
                    thisLock.DateCreatedUTC = DateTime.UtcNow;
                    thisLock.UpdatedBy = newmodel.AppUserID.ToString();
                    thisLock.LastUpdatedUTC = DateTime.UtcNow;

                    _context.RecordLocks.Add(thisLock);
                    ReturnData ret;
                    ret = _context.SaveData();

                    if (ret.Message == "Success")
                    { return Ok(); }

                    return NotFound(ret);
                }
            }
            return BadRequest();
        }

        [HttpDelete]
        public IActionResult Unlock([FromBody] LockEntry delmodel)
        {
            var todelete = _context.RecordLocks
                .FirstOrDefault(t => t.WorkUnitTypeID == delmodel.WorkUnitTypeID 
                    && t.IDFromWorkUnitsDBTable == delmodel.IDFromWorkUnitsDBTable
                    && t.AppUserID == delmodel.AppUserID);

            if (todelete == null)
            { return NotFound(); }

            _context.RecordLocks.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }


        [HttpGet("Duration")]
        public IEnumerable<WorkUnitLockDurationInMin> Get()
        {
            return _context.WorkUnitLockDurationInMin
                 .Include("WorkUnitType")
                 .ToList();
        }

        [HttpGet("Duration/{id}")]
        public WorkUnitLockDurationInMin Get(int id)
        {
            return _context.WorkUnitLockDurationInMin
                .Include("WorkUnitType")
                .FirstOrDefault(x => x.WorkLockDurationInMinID == id);
                
        }

        [HttpPost("Duration")]
        public IActionResult Create([FromBody] WorkUnitLockDurationInMin newmodel)
        {
            if (ModelState.IsValid)
            {
                _context.WorkUnitLockDurationInMin.Add(newmodel);
                _context.SaveChanges();
                return Ok("Work Unit Lock duration added");
            }
            else
            { return BadRequest(); }
        }

        [HttpDelete("Duration/{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.WorkUnitLockDurationInMin.FirstOrDefault(t => t.WorkLockDurationInMinID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.WorkUnitLockDurationInMin.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPut("Duration")]
        public IActionResult UpdateEntry([FromBody] WorkUnitLockDurationInMin objupd)
        {
            var targetObject = _context.WorkUnitLockDurationInMin.FirstOrDefault(t => t.WorkLockDurationInMinID == objupd.WorkLockDurationInMinID);
            if (targetObject == null)
            { return NotFound(); }

            _context.Entry(targetObject).CurrentValues.SetValues(objupd);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

    }
}
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LNWCOE.Data;
using LNWCOE.Models.Admin;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace LNWCOE.Helpers.Admin
{
    [Produces("application/json")]
    [Route("api/user")]
    [Authorize]
    public class AppUserController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<AppUserController> _logger;

        public AppUserController(AppDbContext context, ILogger<AppUserController> logger)
        {
            this._context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IEnumerable<AppUser>> GetAsync()
        {
            ;
            return await _context.AppUser.ToListAsync();
        }

        [HttpGet]
        [Route("disp")]
        public async Task<List<UserDisplay>> GetDispAsync()
        {
            Task<List<UserDisplay>> result = _context.UserDisplay.FromSql("usp_UserDisplay_sel").
                Select(ud => new UserDisplay {
                    AppUserID = ud.AppUserID,
                    AppUserName = ud.AppUserName,
                    Email = ud.Email,
                    PhotoImage = ud.PhotoImage,
                    UTCOffset = ud.UTCOffset,
                    IsInternal = ud.IsInternal,
                    IsActive = ud.IsActive,
                    SupervisorAppUserID = ud.SupervisorAppUserID,
                    OfficeID = ud.OfficeID,
                    OperationalRoleTypeID = ud.OperationalRoleTypeID,
                    GenderTypeID = ud.GenderTypeID,
                    CreatedBy = ud.CreatedBy,
                    UpdatedBy = ud.UpdatedBy,
                    DateCreatedUTC = ud.DateCreatedUTC,
                    LastUpdatedUTC = ud.LastUpdatedUTC,
                    OfficeName = ud.OfficeName,
                    SupervisorName = ud.SupervisorName,
                    GenderName = ud.GenderName,
                    OperationalRoleName = ud.OperationalRoleName,
                    RoleTypeID = ud.RoleTypeID,
                    RoleTypeName = ud.RoleTypeName
                }).ToListAsync();

            return await result;
            
            /*
            var returnData = from users in _context.AppUser
                             join offices in _context.Office on users.OfficeID equals offices.OfficeID
                             join sups in _context.AppUser on users.SupervisorAppUserID equals sups.AppUserID
                             join genders in _context.GenderType on users.GenderTypeID equals genders.GenderTypeID
                             join opsrole in _context.OperationalRoleType on users.OperationalRoleTypeID equals opsrole.OperationalRoleTypeID
                             select new UserDisplay {
                                 AppUserID = users.AppUserID,
                                 AppUserName = users.AppUserName,
                                 Email = users.Email,
                                 PhotoImage = users.PhotoImage,
                                 UTCOffset = users.UTCOffset,
                                 IsInternal = users.IsInternal,
                                 IsActive = users.IsActive,
                                 CreatedBy = users.CreatedBy,
                                 UpdatedBy = users.UpdatedBy,
                                 DateCreatedUTC = users.DateCreatedUTC,
                                 LastUpdatedUTC = users.LastUpdatedUTC,

                                 OfficeID = users.OfficeID,
                                 OfficeName = offices.OfficeName,
                                 SupervisorAppUserID = users.SupervisorAppUserID,
                                 SupervisorName = sups.AppUserName,
                                 GenderTypeID = users.GenderTypeID,
                                 Gender = genders.GenderTypeName,
                                 OperationalRoleTypeID = users.OperationalRoleTypeID,
                                 OperationalRole = opsrole.OperationalRoleName
                             };
            return await returnData.ToListAsync();
            */
        }

        /*
        [HttpGet("{id}", Name = "GetUser")]
        public AppUser Get(int id)
        {
            var strReturn = _context.AppUser.FirstOrDefault(x => x.AppUserID == id);
            return strReturn;
        }
        */

        [HttpGet("{id}", Name = "GetUser")]
        public JsonResult Get(int id)
        {
            ;

            var ret =  _context.AppUser
                .Where(x => x.AppUserID == id)
                .Include("Office")
                .Include("OperationalRole")
                .Include("Gender");
              // .Include(Supervisor => new AppUser { }  );
                
            //.Include("Supervisor");
            

            /*
            var ret = from appuser in _context.AppUser
                      join supuser in _context.AppUser on appuser.SupervisorAppUserID equals supuser.AppUserID
                      where appuser.AppUserID == id
                      select new AppUser
                      {
                          AppUserID = appuser.AppUserID,
                          AppUserName = appuser.AppUserName,
                          Email = appuser.Email,
                          PhotoImage = appuser.PhotoImage,
                          UTCOffset = appuser.UTCOffset,
                          IsInternal = appuser.IsInternal,
                          IsActive = appuser.IsActive,
                          CreatedBy = appuser.CreatedBy,
                          UpdatedBy = appuser.UpdatedBy,
                          DateCreatedUTC = appuser.DateCreatedUTC,
                          LastUpdatedUTC = appuser.LastUpdatedUTC,

                          OfficeID = appuser.OfficeID,
                          SupervisorAppUserID = appuser.SupervisorAppUserID,
                         
                          GenderTypeID = appuser.GenderTypeID,
                          OperationalRoleTypeID = appuser.OperationalRoleTypeID
                      };


    */

            return Json(ret.FirstOrDefault());
        }


        [HttpPost]
        public IActionResult Create([FromBody] AppUser newmodel)
        {

            if (ModelState.IsValid)
            {
                _context.AppUser.Add(newmodel);
                _context.SaveChanges();

                return CreatedAtRoute("GetUser", new { id = newmodel.AppUserID }, newmodel);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _context.AppUser.FirstOrDefault(t => t.AppUserID == id);
            if (todelete == null)
            { return NotFound(); }

            _context.AppUser.Remove(todelete);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPatch("{id}")]
        public IActionResult Update(int id, [FromBody]JsonPatchDocument<AppUser> modeltopatch)
        {
            var topatch = _context.AppUser.FirstOrDefault(t => t.AppUserID == id);
            if (topatch == null)
            { return NotFound(); }

            modeltopatch.ApplyTo(topatch);
            ReturnData ret;

            ret = _context.SaveData();

            if (ret.Message == "Success")
            { return Ok(); }

            return NotFound(ret);
        }

        [HttpPut]
        public IActionResult UpdateEntry([FromBody] AppUser objupd)
        {
            var targetObject = _context.AppUser.FirstOrDefault(t => t.AppUserID == objupd.AppUserID);
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
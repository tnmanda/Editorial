using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using LNWCOE.Models.Admin;
using System.Threading.Tasks;
using LNWCOE.Interface;
using Microsoft.AspNetCore.Authorization;

namespace LNWCOE.Helpers.Admin
{
    [Produces("application/json")]
    [Route("api/RoleTypeV2")]
    [Authorize]
    public class RoleTypeV2Controller : Controller
    {
        private readonly IRoleTypeRepository _roleTypeRepository;

        public RoleTypeV2Controller(IRoleTypeRepository roleTypeRepository)
        {
            this._roleTypeRepository = roleTypeRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<RoleType>> Get()
        {
            return await _roleTypeRepository.GetAllAsyn();
        }

        [HttpGet("{id}")]
        public RoleType Get(int id)
        {
            return _roleTypeRepository.Get(id);
        }

        [HttpPost]
        public async Task<RoleType> Add([FromBody]RoleType newobject)
        {
            await _roleTypeRepository.AddAsyn(newobject);
            await _roleTypeRepository.SaveAsync();
            return newobject;
        }

        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            _roleTypeRepository.Delete(_roleTypeRepository.Get(id));
            return "Deleted successfully!";
        }

        [HttpPut]
        public async Task<RoleType> Update([FromBody]RoleType updateobject)
        {
            var updated = await _roleTypeRepository.UpdateAsyn(updateobject, updateobject.RoleTypeID);
            return updated;
        }

        protected override void Dispose(bool disposing)
        {
            _roleTypeRepository.Dispose();
            base.Dispose(disposing);
        }
    }
}
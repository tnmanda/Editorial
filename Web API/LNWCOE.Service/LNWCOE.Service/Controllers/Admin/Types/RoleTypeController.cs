﻿using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using LNWCOE.Service.BaseController;
using LNWCOE.Service.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace LNWCOE.Service.Controllers.Admin
{
    [Route("api/RoleType")]
    public class RoleTypeController : ControllerBase<RoleTypeController>
    {
        private readonly IRoleTypeRepository _repository;

        public RoleTypeController(IRoleTypeRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var data = _repository.GetAll();
            return Helper.CheckResult(data);
        }
        [HttpGet("{id}", Name = "GetRoleType")]
        public IActionResult Get(int id)
        {
            var data = _repository.Get(id);
            return Helper.CheckResult(data);
        }

        [HttpPost]
        public IActionResult Create([FromBody] RoleType newentry)
        {
            var result = _repository.Add(newentry);
            return CreatedAtRoute("GetRoleType", new { id = newentry.RoleTypeID }, newentry);
        }

        [HttpPut]
        public IActionResult Update([FromBody] RoleType editentry)
        {
            var result = _repository.Update(editentry, editentry.RoleTypeID);
            return Helper.CheckResult(result);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todelete = _repository.Get(id);
            if (todelete != null)
            {
                _repository.Delete(todelete);
                return Helper.CheckResult(todelete, true);
            }
            return NotFound();
        }
    }
}
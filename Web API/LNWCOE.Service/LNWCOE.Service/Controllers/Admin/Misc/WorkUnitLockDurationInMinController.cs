﻿using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using LNWCOE.Service.BaseController;
using LNWCOE.Service.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace LNWCOE.Service.Controllers.Admin.Misc
{
    [Route("api/RecordLocks/Duration")]
    public class WorkUnitLockDurationInMinController : ControllerBase<WorkUnitLockDurationInMinController>
    {
        private readonly IWorkUnitLockDurationInMinRepository _repository;

        public WorkUnitLockDurationInMinController(IWorkUnitLockDurationInMinRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var data = _repository.GetAllIncludingByName();
            return Helper.CheckResult(data);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var data = _repository.GetIdIncluding(id);
            return Helper.CheckResult(data);
        }

        [HttpPost]
        public IActionResult Create([FromBody] WorkUnitLockDurationInMin newentry)
        {
            var result = _repository.Add(newentry);
            return Helper.CheckResult(result);
        }

        [HttpPut]
        public IActionResult Update([FromBody] WorkUnitLockDurationInMin editentry)
        {
            var result = _repository.Update(editentry, editentry.WorkLockDurationInMinID);
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
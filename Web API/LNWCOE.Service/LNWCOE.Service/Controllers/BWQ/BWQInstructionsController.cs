using System;
using System.Collections.Generic;
using LNWCOE.Models.BWQ;
using LNWCOE.Models.HR;
using LNWCOE.Module.BWQ.Interface;
using LNWCOE.Service.BaseController;
using LNWCOE.Service.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace LNWCOE.Service.Controllers.BWQ
{
    [Route("api/bwq/BWQInstructions")]
    public class BWQInstructionsController : ControllerBase<BWQInstructionsController>
    {
        private readonly IBWQInstructionsRepository _repository;
        private readonly IConfiguration _configuration;

        public BWQInstructionsController(IBWQInstructionsRepository repository, IConfiguration configuration)
        {
            _repository = repository;
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult Index()
        {
            IEnumerable<BWQInstructions> data = _repository.GetAllIncludingByName();
            return Helper.CheckResult(data);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            BWQInstructions data = _repository.GetIdIncluding(id);
            return Helper.CheckResult(data);
        }

        [HttpPost]
        public IActionResult Create([FromBody] BWQInstructions newentry)
        {
            BWQInstructions result = _repository.Add(newentry);
            return Helper.CheckResult(result);
        }

        [HttpPut]
        public IActionResult Update([FromBody] BWQInstructionsData editentry)
        {
            var result = _repository.UpdateInstruction(editentry, _configuration);

            if (result == null)
            {
                return Helper.CheckResult(result, false, true);
            }
            else
            {
                return Helper.CheckResult(result);
            }
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
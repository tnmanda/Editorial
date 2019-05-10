using System;
using System.Collections.Generic;
using System.IO;
using LNWCOE.Models.BWQ;
using LNWCOE.Models.HR;
using LNWCOE.Module.BWQ.Interface;
using LNWCOE.Service.BaseController;
using LNWCOE.Service.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace LNWCOE.Service.Controllers.BWQ
{
    [Route("api/bwq/BWQEntities")]
    public class BWQEntitiesController : ControllerBase<BWQEntitiesController>
    {
        private readonly IBWQEntitiesRepository _repository;
        private readonly IConfiguration _configuration;

        public BWQEntitiesController(IBWQEntitiesRepository repository, IConfiguration configuration)
        {
            _repository = repository;
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult Index()
        {
            IEnumerable<BWQEntities> data = _repository.GetAllIncludingByName();
            return Helper.CheckResult(data);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            BWQEntities data = _repository.GetIdIncluding(id);
            return Helper.CheckResult(data);
        }

        [HttpPost]
        public IActionResult Create([FromBody] BWQEntities newentry)
        {
            BWQEntities result = _repository.Add(newentry);
            return Helper.CheckResult(result);
        }

        [HttpPut]
        public IActionResult Update([FromBody] BWQEntities editentry)
        {
            BWQEntities result = _repository.Update(editentry, editentry.BWQEntitiesID);
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

        [HttpPost("filter")]
        public IActionResult FilterBWQEntities([FromBody] BWQEntityFilter filter)
        {
            IEnumerable<BWQEntityData> result = _repository.FilterBWQEntities(filter);
            return Helper.CheckResult(result);
        }

        [HttpPost("wrkitem")]
        public IActionResult GetWorkItemID([FromBody] WorkItemPostData wrkItemData)
        {
            object result = _repository.GetWorkItemID(wrkItemData, _configuration);
            return Helper.CheckResult(result);
        }

        [HttpGet("guid/{guid}")]
        public IActionResult GetInstructionsByGuid(Guid guid)
        {
            object result = _repository.GetInstructionsByGuid(guid);
            return Helper.CheckResult(result);
        }

        [HttpPost("upload")]
        //public ActionResult UploadFile([FromForm] IFormFile file)
        public IActionResult UploadFile()
        {
            try
            {
                IFormFileCollection files = Request.Form.Files;

                foreach (var file in files)
                {
                    
                    var result = _repository.GetEntitiesFromFile(file);
                    return Helper.CheckResult(result);
                }
            }
            catch (Exception ex)
            {
                // TODO Log this
                ;
            }

            return null;
        }
    }
}
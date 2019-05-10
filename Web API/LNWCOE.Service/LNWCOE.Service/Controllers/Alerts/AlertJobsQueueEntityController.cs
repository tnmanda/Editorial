using System;
using LNWCOE.Models.Alerts;
using LNWCOE.Models.HR;
using LNWCOE.Module.Alerts.Interface;
using LNWCOE.Service.BaseController;
using LNWCOE.Service.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace LNWCOE.Service.Controllers.Alerts
{
    [Route("api/AlertJobsQueueEntity")]
    public class AlertJobsQueueEntityController : ControllerBase<AlertJobsQueueEntityController>
    {
        private readonly IAlertJobsQueueEntityRepository _repository;
        private readonly IConfiguration _configuration;

        public AlertJobsQueueEntityController(IAlertJobsQueueEntityRepository repository, IConfiguration configuration)
        {
            _repository = repository;
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var data = _repository.GetAll();
            return Helper.CheckResult(data);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var data = _repository.Get(id);
            return Helper.CheckResult(data);
        }

        [HttpGet("nav")]
        public IActionResult GetAlertBatchItems()
        {
            var data = _repository.GetAlertBatchItems();
            return Helper.CheckResult(data);
        }

        [HttpGet("nav_v1")]
        public IActionResult GetAlertBatchItems_v1()
        {
            var data = _repository.GetAlertBatchItems_v1();
            return Helper.CheckResult(data);
        }

        [HttpPost("filter")]
        public IActionResult GetFilteredAlertEntities([FromBody] AlertJobFilter filter)
        {
            var data = _repository.GetFilteredAlertEntities(filter);
            return Helper.CheckResult(data);
        }
        [HttpPost("filter_v1")]
        public IActionResult GetFilteredAlertEntities_v1([FromBody] AlertJobFilter_v1 filter)
        {
            string EmailPoolSuperUserID = _configuration.GetSection("EditorialSettings:EmailPoolSuperUserID").Value;

            var data = _repository.GetFilteredAlertEntities_v1(filter, EmailPoolSuperUserID); 
            return Helper.CheckResult(data);
        }


        [HttpPost("wrkitem")]
        public IActionResult CheckWorkItemIDForEntity([FromBody] WorkItemPostData postData)
        {
            var data = _repository.CheckWorkItemIDForEntity(postData, _configuration);
            return Helper.CheckResult(data);
        }
        

        [HttpPost("wrkitem_v1")]
        public IActionResult CheckWorkItemIDForEntity_v1([FromBody] WorkItemPostData postData)
        {
            var data = _repository.CheckWorkItemIDForEntity_v1(postData, _configuration);
            return Helper.CheckResult(data);
        }
        
        [HttpGet("guid/{guid}")]
        public IActionResult GetByGuid(Guid guid)
        {
            var data = _repository.GetByGuid(guid);
            return Helper.CheckResult(data);
        }

        [HttpGet("guid_v1/{guid}")]
        public IActionResult GetByGuid_v1(Guid guid)
        {
            var data = _repository.GetByGuid_v1(guid);
            return Helper.CheckResult(data);
        }

        [HttpPost("lock")]
        public IActionResult Lock()
        {
            var data = _repository.LockAlert(1,1);
            return Helper.CheckResult(data);
        }

        [HttpPost("unlock")]
        public IActionResult Unlock()
        {
            var data = _repository.UnlockAlert(1,1);
            return Helper.CheckResult(data);
        }


        [HttpPut]
        public IActionResult UpdateEntry([FromBody] AlertJobsQueueEntityDataSave updatedata)
        {
            var result = _repository.UpdateEntry(updatedata, _configuration);

            if (result == null)
            {
                return Helper.CheckResult(result, false, true);
            }
            else
            {
                return Helper.CheckResult(result);
            }
        }

    }
}
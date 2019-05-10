using LNWCOE.Models.Alerts;
using LNWCOE.Module.Alerts.Interface;
using LNWCOE.Service.BaseController;
using LNWCOE.Service.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace LNWCOE.Service.Controllers.Alerts
{
    [Route("api/AlertJobsQueue")]
    public class AlertJobsQueueController : ControllerBase<AlertJobsQueueController>
    {
        private readonly IAlertJobsQueueRepository _repository;
        private readonly IConfiguration _configuration;

        public AlertJobsQueueController(IAlertJobsQueueRepository repository, IConfiguration configuration)
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

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            /*
            var todelete = _repository.Get(id);
            if (todelete != null)
            {
                _repository.Delete(todelete);
                return Helper.CheckResult(todelete, true);
            }
            return NotFound();
            */
            var todelete = _repository.Get(id);
            if (todelete != null)
            {
                _repository.DeleteJobQueueEntry(todelete);
                return Helper.CheckResult(todelete, true);
            }

            return NotFound();
        }

        [HttpGet("job/{id}")]
        public IActionResult GetByJobId(int id)
        {
            var data = _repository.GetByJobId(id);
            return Helper.CheckResult(data);
        }

        [HttpGet("priority")]
        public IActionResult GetAlertPriority()
        {
            var data = _repository.GetAlertPriority();
            return Helper.CheckResult(data);
        }

        [HttpGet("status")]
        public IActionResult GetAlertStatus()
        {
            var data = _repository.GetAlertStatus();
            return Helper.CheckResult(data);
        }

        [HttpGet("disposition")]
        public IActionResult GetAlertDisposition()
        {
            var data = _repository.GetAlertDisposition();
            return Helper.CheckResult(data);
        }

        [HttpGet("nav")]
        public IActionResult GetAlertBatches()
        {
            var data = _repository.GetAlertBatches();
            return Helper.CheckResult(data);
        }

        [HttpGet("close/{id}")]
        public IActionResult CloseAlertJobsQueue(int id)
        {
            var data = _repository.CloseAlertJobsQueue(id);
            return Helper.CheckResult(data);
        }

        [HttpPost]
        public IActionResult Create([FromBody] AlertJobsQueueData newdata)
        {
            var data = _repository.CreateAlertJobsQueue(newdata, _configuration);
            return Helper.CheckResult(data);
            
        }


    }
}

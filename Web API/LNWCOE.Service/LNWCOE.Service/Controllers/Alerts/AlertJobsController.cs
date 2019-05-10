using LNWCOE.Models.Alerts;
using LNWCOE.Module.Alerts.Interface;
using LNWCOE.Service.BaseController;
using LNWCOE.Service.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace LNWCOE.Service.Controllers.Alerts
{
    [Route("api/AlertJobs")]
    public class AlertJobsController : ControllerBase<AlertJobsController>
    {
        private readonly IAlertJobsRepository _repository;

        public AlertJobsController(IAlertJobsRepository repository)
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
        public IActionResult Create([FromBody] AlertJobs newentry)
        {
            var result = _repository.Add(newentry);
            return Helper.CheckResult(result);
        }

        [HttpPut]
        public IActionResult Update([FromBody] AlertJobs editentry)
        {
            var result = _repository.Update(editentry, editentry.AlertJobsID);
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

        [HttpGet("pastdue")]
        public IActionResult GetPastDueAlerts()
        {
            var result = _repository.GetPastDueAlerts();
            return Helper.CheckResult(result);
        }

        [HttpGet("inactive")]
        public IActionResult InActiveAlerts()
        {
            var result = _repository.InActiveAlerts();
            return Helper.CheckResult(result);
        }
    }
}
using LNWCOE.Models.Alerts;
using LNWCOE.Module.Alerts.Interface;
using LNWCOE.Service.BaseController;
using LNWCOE.Service.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace LNWCOE.Service.Controllers.Alerts
{
    [Route("api/AlertSourceType")]
    public class AlertSourceTypeController : ControllerBase<AlertSourceTypeController>
    {
        private readonly IAlertSourceTypeRepository _repository;

        public AlertSourceTypeController(IAlertSourceTypeRepository repository)
        {
            _repository = repository;
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

        [HttpPost]
        public IActionResult Create([FromBody] AlertSourceType newentry)
        {
            var result = _repository.Add(newentry);
            return Helper.CheckResult(result);
        }

        [HttpPut]
        public IActionResult Update([FromBody] AlertSourceType editentry)
        {
            var result = _repository.Update(editentry, editentry.AlertSourceTypeID);
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
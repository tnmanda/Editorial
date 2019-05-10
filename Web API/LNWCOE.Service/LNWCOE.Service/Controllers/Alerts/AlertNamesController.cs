using LNWCOE.Models.Alerts;
using LNWCOE.Module.Alerts.Interface;
using LNWCOE.Service.BaseController;
using LNWCOE.Service.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace LNWCOE.Service.Controllers.Alerts
{
    [Route("api/AlertNames")]
    public class AlertNamesController : ControllerBase<AlertNamesController>
    {
        private readonly IAlertNamesRepository _repository;

        public AlertNamesController(IAlertNamesRepository repository)
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

        [HttpGet("job/{id}")]
        public IActionResult GetByJobID(int id)
        {
            var data = _repository.GetByJobID(id);
            return Helper.CheckResult(data);
        }
    }
}
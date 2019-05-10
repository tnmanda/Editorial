using LNWCOE.Models.Investigations;
using LNWCOE.Module.Investigations.Interface;
using LNWCOE.Service.BaseController;
using LNWCOE.Service.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace LNWCOE.Service.Controllers.Investigations
{
    [Route("api/InvestigationEmails")]
    public class InvestigationEmailsController : ControllerBase<InvestigationEmailsController>
    {
        private readonly IInvestigationEmailsRepository _repository;

        public InvestigationEmailsController(IInvestigationEmailsRepository repository)
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
        public IActionResult Create([FromBody] InvestigationEmails newentry)
        {
            var result = _repository.Add(newentry);
            return Helper.CheckResult(result);
        }

        [HttpPut]
        public IActionResult Update([FromBody] InvestigationEmails editentry)
        {
            var result = _repository.Update(editentry, editentry.InvestigationEmailID);
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
using System;
using LNWCOE.Models.HR;
using LNWCOE.Models.Investigations;
using LNWCOE.Module.Investigations.Interface;
using LNWCOE.Service.BaseController;
using LNWCOE.Service.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace LNWCOE.Service.Controllers.Investigations
{
    [Route("api/Investigation")]
    public class InvestigationController : ControllerBase<InvestigationController>
    {
        private readonly IInvestigationRepository _repository;
        private readonly IConfiguration _configuration;

        public InvestigationController(IInvestigationRepository repository, IConfiguration configuration)
        {
            _repository = repository;
            _configuration = configuration;
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
        public IActionResult Create([FromBody] Investigation newentry)
        {
            var result = _repository.Add(newentry);
            return Helper.CheckResult(result);
        }

        [HttpPut]
        public IActionResult Update([FromBody] InvestigationDataSave investigationdata)
        {
            var result = _repository.UpdateInvestigationEntity(investigationdata, _configuration);

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

        [HttpGet("nav/{appuserid}")]
        public IActionResult GetNavigationsWithCounts(int appuserid)
        {
            var result = _repository.GetNavigationsWithCounts(appuserid);
            return Helper.CheckResult(result);
        }

        [HttpPost("filter")]
        public IActionResult GetFilteredInvestigations([FromBody] InvestigationFilter invFilter)
        {
            var result = _repository.GetFilteredInvestigations(invFilter);
            return Helper.CheckResult(result);
        }

        [HttpPost("wrkitem")]
        public IActionResult CheckWorkItemIDForInvestigationEntity([FromBody] WorkItemPostData postData)
        {
            var result = _repository.CheckWorkItemIDForInvestigationEntity(postData, _configuration);
            return Helper.CheckResult(result);
        }

        [HttpGet("guid/{guid}")]
        public IActionResult GetByGuid(Guid guid)
        {
            var result = _repository.GetByGuid(guid);
            return Helper.CheckResult(result);
        }

        [HttpPost("activity")]
        public IActionResult AddInvestigationActivity([FromBody] InvestigationDataSave investigationactivity)
        {
            var result = _repository.AddInvestigationActivity(investigationactivity);
            return Helper.CheckResult(result);
        }

        [HttpPost("sendmail")]
        public IActionResult SendInvestigationEmail([FromBody] InvestiationEmailRequest emailrequest)
        {
            var result = _repository.SendInvestigationEmail(emailrequest, _configuration);
            return Helper.CheckResult(result);
        }
    }
}
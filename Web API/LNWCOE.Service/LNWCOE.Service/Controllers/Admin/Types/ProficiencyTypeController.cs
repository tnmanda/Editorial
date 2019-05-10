using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using LNWCOE.Service.BaseController;
using LNWCOE.Service.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace LNWCOE.Service.Controllers.Admin
{
    [Route("api/ProficiencyType")]
    public class ProficiencyTypeController : ControllerBase<ProficiencyTypeController>
    {
        private readonly IProficiencyTypeRepository _repository;

        public ProficiencyTypeController(IProficiencyTypeRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var data = _repository.GetAll();
            return Helper.CheckResult(data);
        }
        [HttpGet("{id}", Name = "GetProficiencyType")]
        public IActionResult Get(int id)
        {
            var data = _repository.Get(id);
            return Helper.CheckResult(data);
        }

        [HttpPost]
        public IActionResult Create([FromBody] ProficiencyType newentry)
        {
            var result = _repository.Add(newentry);
            return CreatedAtRoute("GetProficiencyType", new { id = newentry.ProficiencyTypeID }, newentry);
        }

        [HttpPut]
        public IActionResult Update([FromBody] ProficiencyType editentry)
        {
            var result = _repository.Update(editentry, editentry.ProficiencyTypeID);
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
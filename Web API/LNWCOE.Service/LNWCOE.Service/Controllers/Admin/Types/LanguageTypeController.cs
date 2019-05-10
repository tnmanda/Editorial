using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using LNWCOE.Service.BaseController;
using LNWCOE.Service.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace LNWCOE.Service.Controllers.Admin
{
    [Route("api/LanguageType")]
    public class LanguageTypeController : ControllerBase<LanguageTypeController>
    {
        private readonly ILanguageTypeRepository _repository;

        public LanguageTypeController(ILanguageTypeRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var data = _repository.GetAll();
            return Helper.CheckResult(data);
        }
        [HttpGet("{id}", Name = "GetLanguageType")]
        public IActionResult Get(int id)
        {
            var data = _repository.Get(id);
            return Helper.CheckResult(data);
        }

        [HttpPost]
        public IActionResult Create([FromBody] LanguageType newentry)
        {
            var result = _repository.Add(newentry);
            return CreatedAtRoute("GetLanguageType", new { id = newentry.LanguageTypeID }, newentry);
        }

        [HttpPut]
        public IActionResult Update([FromBody] LanguageType editentry)
        {
            var result = _repository.Update(editentry, editentry.LanguageTypeID);
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
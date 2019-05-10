using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using LNWCOE.Service.BaseController;
using LNWCOE.Service.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace LNWCOE.Service.Controllers.Admin
{
    [Route("api/Education")]
    public class EducationTypeController : ControllerBase<EducationTypeController>
    {
        private readonly IEducationTypeRepository _repository;

        public EducationTypeController(IEducationTypeRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var data = _repository.GetAll();
            return Helper.CheckResult(data);
        }
        [HttpGet("{id}", Name = "GetEducationType")]
        public IActionResult Get(int id)
        {
            var data = _repository.Get(id);
            return Helper.CheckResult(data);
        }

        [HttpPost]
        public IActionResult Create([FromBody] EducationType newentry)
        {
            var result = _repository.Add(newentry);
            return CreatedAtRoute("GetEducationType", new { id = newentry.EducationTypeID }, newentry);
        }

        [HttpPut]
        public IActionResult Update([FromBody] EducationType editentry)
        {
            var result = _repository.Update(editentry, editentry.EducationTypeID);
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
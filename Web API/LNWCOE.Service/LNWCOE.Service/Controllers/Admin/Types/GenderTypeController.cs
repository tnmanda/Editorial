using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using LNWCOE.Service.BaseController;
using LNWCOE.Service.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace LNWCOE.Service.Controllers.Admin
{
    [Route("api/Gender")]
    public class GenderTypeController : ControllerBase<GenderTypeController>
    {
        private readonly IGenderTypeRepository _repository;

        public GenderTypeController(IGenderTypeRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var data = _repository.GetAll();
            return Helper.CheckResult(data);
        }
        [HttpGet("{id}", Name = "GetGenderType")]
        public IActionResult Get(int id)
        {
            var data = _repository.Get(id);
            return Helper.CheckResult(data);
        }

        [HttpPost]
        public IActionResult Create([FromBody] GenderType newentry)
        {
            var result = _repository.Add(newentry);
            return CreatedAtRoute("GetGenderType", new { id = newentry.GenderTypeID }, newentry);
        }

        [HttpPut]
        public IActionResult Update([FromBody] GenderType editentry)
        {
            var result = _repository.Update(editentry, editentry.GenderTypeID);
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
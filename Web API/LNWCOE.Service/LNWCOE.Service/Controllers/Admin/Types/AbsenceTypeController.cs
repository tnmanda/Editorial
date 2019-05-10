using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using LNWCOE.Service.BaseController;
using LNWCOE.Service.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace LNWCOE.Service.Controllers.Admin
{
    [Route("api/AbsenceType")]
    public class AbsenceTypeController : ControllerBase<AbsenceTypeController>
    {
        private readonly IAbsenceTypeRepository _repository;

        public AbsenceTypeController(IAbsenceTypeRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var data = _repository.GetAll();
            return Helper.CheckResult(data);
        }
        [HttpGet("{id}", Name = "GetAbsenceType")]
        public IActionResult Get(int id)
        {
            var data = _repository.Get(id);
            return Helper.CheckResult(data);
        }

        [HttpPost]
        public IActionResult Create([FromBody] AbsenceType newentry)
        {
            var result = _repository.Add(newentry);
            return CreatedAtRoute("GetAbsenceType", new { id = newentry.AbsenceTypeID }, newentry);
        }

        [HttpPut]
        public IActionResult Update([FromBody] AbsenceType editentry)
        {
            var result = _repository.Update(editentry, editentry.AbsenceTypeID);
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
using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using LNWCOE.Service.BaseController;
using LNWCOE.Service.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace LNWCOE.Service.Controllers.Admin
{
    [Route("api/DepartureType")]
    public class DepartureTypeController : ControllerBase<DepartureTypeController>
    {
        private readonly IDepartureTypeRepository _repository;

        public DepartureTypeController(IDepartureTypeRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var data = _repository.GetAll();
            return Helper.CheckResult(data);
        }
        [HttpGet("{id}", Name = "GetDepartureType")]
        public IActionResult Get(int id)
        {
            var data = _repository.Get(id);
            return Helper.CheckResult(data);
        }

        [HttpPost]
        public IActionResult Create([FromBody] DepartureType newentry)
        {
            var result = _repository.Add(newentry);
            return CreatedAtRoute("GetDepartureType", new { id = newentry.DepartureTypeID }, newentry);
        }

        [HttpPut]
        public IActionResult Update([FromBody] DepartureType editentry)
        {
            var result = _repository.Update(editentry, editentry.DepartureTypeID);
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
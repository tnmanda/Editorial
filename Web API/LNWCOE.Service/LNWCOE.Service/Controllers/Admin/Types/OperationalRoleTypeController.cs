using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using LNWCOE.Service.BaseController;
using LNWCOE.Service.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace LNWCOE.Service.Controllers.Admin
{
    [Route("api/OperationalRole")]
    public class OperationalRoleTypeController : ControllerBase<OperationalRoleTypeController>
    {
        private readonly IOperationalRoleTypeRepository _repository;

        public OperationalRoleTypeController(IOperationalRoleTypeRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var data = _repository.GetAll();
            return Helper.CheckResult(data);
        }
        [HttpGet("{id}", Name = "GetOperationalRoleType")]
        public IActionResult Get(int id)
        {
            var data = _repository.Get(id);
            return Helper.CheckResult(data);
        }

        [HttpPost]
        public IActionResult Create([FromBody] OperationalRoleType newentry)
        {
            var result = _repository.Add(newentry);
            return CreatedAtRoute("GetOperationalRoleType", new { id = newentry.OperationalRoleTypeID }, newentry);
        }

        [HttpPut]
        public IActionResult Update([FromBody] OperationalRoleType editentry)
        {
            var result = _repository.Update(editentry, editentry.OperationalRoleTypeID);
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
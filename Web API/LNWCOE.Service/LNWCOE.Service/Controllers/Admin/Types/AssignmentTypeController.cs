using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using LNWCOE.Service.BaseController;
using LNWCOE.Service.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace LNWCOE.Service.Controllers.Admin
{
    [Route("api/AssignmentType")]
    public class AssignmentTypeController : ControllerBase<AssignmentTypeController>
    {
        private readonly IAssignmentTypeRepository _repository;

        public AssignmentTypeController(IAssignmentTypeRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var data = _repository.GetAll();
            return Helper.CheckResult(data);
        }
        [HttpGet("{id}", Name = "GetAssignmentType")]
        public IActionResult Get(int id)
        {
            var data = _repository.Get(id);
            return Helper.CheckResult(data);
        }

        [HttpPost]
        public IActionResult Create([FromBody] AssignmentType newentry)
        {
            var result = _repository.Add(newentry);
            return CreatedAtRoute("GetAssignmentType", new { id = newentry.AssignmentTypeID }, newentry);
        }

        [HttpPut]
        public IActionResult Update([FromBody] AssignmentType editentry)
        {
            var result = _repository.Update(editentry, editentry.AssignmentTypeID);
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
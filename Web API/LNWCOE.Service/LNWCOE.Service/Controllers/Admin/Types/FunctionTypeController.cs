using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using LNWCOE.Service.BaseController;
using LNWCOE.Service.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace LNWCOE.Service.Controllers.Admin
{
    [Route("api/FunctionType")]
    public class FunctionTypeController : ControllerBase<FunctionTypeController>
    {
        private readonly IFunctionTypeRepository _repository;

        public FunctionTypeController(IFunctionTypeRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var data = _repository.GetAll();
            return Helper.CheckResult(data);
        }
        [HttpGet("{id}", Name = "GetFunctionType")]
        public IActionResult Get(int id)
        {
            var data = _repository.Get(id);
            return Helper.CheckResult(data);
        }

        [HttpPost]
        public IActionResult Create([FromBody] FunctionType newentry)
        {
            var result = _repository.Add(newentry);
            return CreatedAtRoute("GetFunctionType", new { id = newentry.FunctionTypeID }, newentry);
        }

        [HttpPut]
        public IActionResult Update([FromBody] FunctionType editentry)
        {
            var result = _repository.Update(editentry, editentry.FunctionTypeID);
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
using LNWCOE.Models.Admin.Pages;
using LNWCOE.Module.Admin.Interface;
using LNWCOE.Service.BaseController;
using LNWCOE.Service.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace LNWCOE.Service.Controllers.Admin.Pages
{
    [Route("api/ParentGroup")]
    public class ParentGroupController : ControllerBase<ParentGroupController>
    {
        private readonly IParentGroupRepository _repository;

        public ParentGroupController(IParentGroupRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var data = _repository.GetAll();
            return Helper.CheckResult(data);
        }

        [HttpGet("{id}", Name = "GetParentGroup")]
        public IActionResult Get(int id)
        {
            var data = _repository.Get(id);
            return Helper.CheckResult(data);
        }

        [HttpPost]
        public IActionResult Create([FromBody] ParentGroup newentry)
        {
            var result = _repository.Add(newentry);
            return CreatedAtRoute("GetParentGroup", new { id = newentry.ParentGroupID }, newentry);
        }

        [HttpPut]
        public IActionResult Update([FromBody] ParentGroup editentry)
        {
            var result = _repository.Update(editentry, editentry.ParentGroupID);
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
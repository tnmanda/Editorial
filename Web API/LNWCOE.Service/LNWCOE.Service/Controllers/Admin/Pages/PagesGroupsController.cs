using LNWCOE.Models.Admin.Pages;
using LNWCOE.Module.Admin.Interface;
using LNWCOE.Service.BaseController;
using LNWCOE.Service.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace LNWCOE.Service.Controllers.Admin.Pages
{
    [Route("api/PagesGroups")]
    public class PagesGroupsController : ControllerBase<PagesGroupsController>
    {
        private readonly IPagesGroupsRepository _repository;

        public PagesGroupsController(IPagesGroupsRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var data = _repository.GetAllIncludingByName();
            return Helper.CheckResult(data);
        }

        [HttpGet("{id}", Name = "GetPagesGroups")]
        public IActionResult Get(int id)
        {
            var data = _repository.GetIdIncluding(id);
            return Helper.CheckResult(data);
        }

        [HttpPost]
        public IActionResult Create([FromBody] PagesGroups newentry)
        {
            var result = _repository.Add(newentry);
            return CreatedAtRoute("GetPagesGroups", new { id = newentry.PagesGroupsID }, newentry);
        }

        [HttpPut]
        public IActionResult Update([FromBody] PagesGroups editentry)
        {
            var result = _repository.Update(editentry, editentry.PagesGroupsID);
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
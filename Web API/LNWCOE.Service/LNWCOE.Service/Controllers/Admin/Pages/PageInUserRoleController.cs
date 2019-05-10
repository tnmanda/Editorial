using LNWCOE.Models.Admin.Pages;
using LNWCOE.Module.Admin.Interface;
using LNWCOE.Service.BaseController;
using LNWCOE.Service.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace LNWCOE.Service.Controllers.Admin.Pages
{
    [Route("api/PageInUserRole")]
    public class PageInUserRoleController : ControllerBase<PageInUserRoleController>
    {
        private readonly IPageInUserRoleRepository _repository;

        public PageInUserRoleController(IPageInUserRoleRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var data = _repository.GetAllIncludingByName();
            return Helper.CheckResult(data);
        }

        [HttpGet("{id}", Name = "PageInUserRole")]
        public IActionResult Get(int id)
        {
            var data = _repository.GetIdIncluding(id);
            return Helper.CheckResult(data);
        }

        [HttpPost]
        public IActionResult Create([FromBody] PageInUserRole newentry)
        {
            var result = _repository.Add(newentry);
            return CreatedAtRoute("PageInUserRole", new { id = newentry.PageInUserRoleID }, newentry); 
           
        }

        [HttpPut]
        public IActionResult Update([FromBody] PageInUserRole editentry)
        {
            var result = _repository.Update(editentry, editentry.PageInUserRoleID);
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

        [HttpGet("role/{id}")]
        public IActionResult GetPagesForRole(int id)
        {
            var data = _repository.GetAllByRole(id);
            return Helper.CheckResult(data);
        }
    }
}
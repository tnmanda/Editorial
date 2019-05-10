using LNWCOE.Module.Admin.Interface;
using LNWCOE.Service.BaseController;
using LNWCOE.Service.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace LNWCOE.Service.Controllers.Admin
{
    [Route("api/Page")]
    public class PagesController : ControllerBase<PagesController>
    {
        private readonly IPageRepository _repository;
        
        public PagesController(IPageRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var data = _repository.GetAllIncludingByName();
            return Helper.CheckResult(data);
        }

        [HttpGet("{id}", Name = "GetPage")]
        public IActionResult Get(int id)
        {
            var data = _repository.GetIdIncluding(id);
            return Helper.CheckResult(data); 
        }

        [HttpGet("user/{id}")]
        public IActionResult GeByUser(int id)
        {
            var data = _repository.GetAllByUser(id);
            return Helper.CheckResult(data);
        }

        [HttpGet("role/{id}")]
        public IActionResult GeByRole(int id)
        {
            var data = _repository.GetAllByRole(id);
            return Helper.CheckResult(data);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Models.Admin.Pages.Pages newentry)
        {
            var result = _repository.Add(newentry);
            return CreatedAtRoute("GetPage", new { id = newentry.PagesID }, newentry); 
        }

        [HttpPut]
        public IActionResult Update([FromBody] Models.Admin.Pages.Pages editentry)
        {
            var result = _repository.Update(editentry, editentry.PagesID);
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
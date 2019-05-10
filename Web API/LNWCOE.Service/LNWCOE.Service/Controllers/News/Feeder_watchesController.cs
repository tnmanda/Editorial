using LNWCOE.Models.News;
using LNWCOE.Module.News.Interface;
using LNWCOE.Service.BaseController;
using LNWCOE.Service.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace LNWCOE.Service.Controllers.News
{
    [Route("api/News/Feeder_watches")]
    public class Feeder_watchesController : ControllerBase<Feeder_watchesController>
    {
        private readonly IFeeder_watchesRepository _repository;

        public Feeder_watchesController(IFeeder_watchesRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var data = _repository.GetAllWatchesWithLanguage();
            return Helper.CheckResult(data);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var data = _repository.GetAllWatchesByIDWithLanguage(id);
            return Helper.CheckResult(data);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Feeder_watches watch)
        {
            var result = _repository.AddNewWatch(watch);
            return Helper.CheckResult(result);
        }

        [HttpPut]
        public IActionResult Update([FromBody] Feeder_watches watch)
        {
            var result = _repository.UpdateWatch(watch);
            return Helper.CheckResult(result);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var result = _repository.DeleteWatch(id);
            return Helper.CheckResult(result, true);
        }
    }
}
using LNWCOE.Models.News;
using LNWCOE.Module.News.Interface;
using LNWCOE.Service.BaseController;
using LNWCOE.Service.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace LNWCOE.Service.Controllers.News
{
    [Route("api/News/Feeder_WatchKeywords")]
    public class Feeder_WatchKeywordsController : ControllerBase<Feeder_WatchKeywordsController>
    {
        private readonly IFeeder_WatchKeywordsRepository _repository;

        public Feeder_WatchKeywordsController(IFeeder_WatchKeywordsRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var data = _repository.GetAll();
            return Helper.CheckResult(data);
        }
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var data = _repository.Get(id);
            return Helper.CheckResult(data);
        }

        [HttpGet("watch/{id}")]
        public IActionResult GetByWatchId(int id)
        {
            var data = _repository.GetByWatchId(id);
            return Helper.CheckResult(data);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Feeder_WatchKeywords watchkeyword)
        {
            var result = _repository.CreateFeeder_WatchKeyword(watchkeyword);
            return Helper.CheckResult(result);
        }

        [HttpPost("batch")]
        public IActionResult CreateFromString([FromBody] Feeder_WatchKeywordsBatch watchkeywords)
        {
            var result = _repository.CreateFeeder_WatchKeywords(watchkeywords);
            return Helper.CheckResult(result);
        }

        [HttpPut]
        public IActionResult Update([FromBody] Feeder_WatchKeywords editentry)
        {
            var result = _repository.Update(editentry, editentry.pkKeywordID);
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
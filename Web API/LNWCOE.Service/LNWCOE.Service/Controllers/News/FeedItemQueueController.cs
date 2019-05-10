using LNWCOE.Models.News;
using LNWCOE.Module.News.Interface;
using LNWCOE.Service.BaseController;
using LNWCOE.Service.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace LNWCOE.Service.Controllers.News
{
    [Route("api/News/FeedItemQueue")]
    public class FeedItemQueueController : ControllerBase<FeedItemQueueController>
    {
        private readonly IFeedItemQueueRepository _repository;
        private readonly IConfiguration _configuration;

        public FeedItemQueueController(IFeedItemQueueRepository repository, IConfiguration configuration)
        {
            _repository = repository;
            _configuration = configuration;
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
        
        [HttpPut]
        public IActionResult Update([FromBody] NewsDataSave newsdata)
        {
            var result = _repository.UpdateNewsEntity(newsdata, _configuration);

            if(result == null)
            {
                return Helper.CheckResult(result, false, true);
            }
            else
            {
                return Helper.CheckResult(result);
            }
            
        }

    }
}
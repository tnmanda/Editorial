using System;
using LNWCOE.Models.Admin;
using LNWCOE.Models.HR;
using LNWCOE.Models.News;
using LNWCOE.Module.News.Interface;
using LNWCOE.Service.BaseController;
using LNWCOE.Service.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace LNWCOE.Service.Controllers.News
{
    [Route("api/News")]
    public class NewsController : ControllerBase<NewsController>
    {
        private readonly INewsRepository _repository;
        private readonly IConfiguration _configuration;

        public NewsController(INewsRepository repository, IConfiguration configuration)
        {
            _repository = repository;
            _configuration = configuration;
        }

        [HttpGet("nav/{appuserid}")]
        public IActionResult GetNewsNavigation(int appuserid)
        {
            object data = _repository.GetNewsNavigation(appuserid, _configuration);
            return Helper.CheckResult(data);
        }

        [HttpPost("filter")]
        public IActionResult GetNewsNavigationFilter([FromBody] NewsFilter filter)
        {
            object data = _repository.GetFilteredNewsNavigation(filter, _configuration);
            return Helper.CheckResult(data);
        }

        [HttpPost("wrkitem")]
        public IActionResult CheckNewsWorkItemID([FromBody] WorkItemPostData postData)
        {
            object data = _repository.CheckNewsWorkItemID(postData, _configuration);
            return Helper.CheckResult(data);
        }

        [HttpGet("guid/{guid}")]
        public IActionResult GetNewsEntryByGuid(Guid guid)
        {
            object data = _repository.GetNewsEntryByGuid(guid);
            return Helper.CheckResult(data);
        }

        [HttpGet("search/{newsqentryid}")]
        public IActionResult SearchNewsQueueEntryById(int newsqentryid)
        {
            NewsData data = _repository.SearchNewsQueueEntryById(newsqentryid, _configuration);
            return Helper.CheckResult(data);
        }

        [HttpPost("lock")]
        public IActionResult LockNewsItem([FromBody] LockEntry lockentry)
        {
            var data = _repository.LockNewsItem(lockentry);
            return Helper.CheckResult(data);
        }

        [HttpPost("unlock")]
        public IActionResult UnLockNewsItem([FromBody] LockEntry lockentry)
        {
            var data = _repository.UnLockNewsItem(lockentry);
            return Helper.CheckResult(data);
        }
    }
}
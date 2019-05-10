using LNWCOE.Models.BWQ;
using LNWCOE.Module.BWQ.Interface;
using LNWCOE.Service.BaseController;
using LNWCOE.Service.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace LNWCOE.Service.Controllers.BWQ
{
    [Route("api/Bwq")]
    public class BwqController : ControllerBase<BwqController>
    {
        private readonly IBWQRepository _repository;
        private readonly IConfiguration _configuration;

        public BwqController(IBWQRepository repository, IConfiguration configuration )
        {
            _repository = repository;
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var data = _repository.GetBWQEntries();
            return Helper.CheckResult(data);
        }
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var data = _repository.GetById(id);
            return Helper.CheckResult(data);
        }

        [HttpPut]
        public IActionResult Update([FromBody] Bwq editentry)
        {
            var result = _repository.Update(editentry, editentry.BWQID);
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

        [HttpGet("nav/{appuserid}")]
        public IActionResult GetNavWithCountsAndUser(int appuserid)
        {
            var result = _repository.GetNavCountsWithUser(appuserid);
            return Helper.CheckResult(result);
        }

        [HttpPost]
        public IActionResult CreateNewBatch([FromBody] NewBatchObject newbatch)
        {
            var result = _repository.CreateNewBatch(newbatch, _configuration);
            return Helper.CheckResult(result);
        }

    }
}
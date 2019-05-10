using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using LNWCOE.Service.BaseController;
using LNWCOE.Service.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace LNWCOE.Service.Controllers.Admin.Misc
{
    [Route("api/RecordLocks")]
    public class RecordLocksController : ControllerBase<RecordLocksController>
    {
        private readonly IRecordLocksRepository _repository;

        public RecordLocksController(IRecordLocksRepository repository)
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

        /*
        [HttpPost]
        public IActionResult Create([FromBody] RecordLocks newentry)
        {
            var result = _repository.Add(newentry);
            return Helper.CheckResult(result);
        }
        */

        [HttpPut]
        public IActionResult Update([FromBody] RecordLocks editentry)
        {
            var result = _repository.Update(editentry, editentry.RecordLockID);
            return Helper.CheckResult(result);
        }

        /*
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
        */
        [HttpPost]
        public IActionResult Lock([FromBody] LockEntry newmodel)
        {
            var result = _repository.Lock(newmodel);
            return Helper.CheckResult(result);
        }

        [HttpDelete]
        public IActionResult Unlock([FromBody] LockEntry delmodel)
        {
            var result = _repository.Unlock(delmodel);
            return Helper.CheckResult(result);
        }
    }
}
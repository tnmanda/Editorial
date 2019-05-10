using LNWCOE.Models.Admin;
using LNWCOE.Module.Admin.Interface;
using LNWCOE.Service.BaseController;
using LNWCOE.Service.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace LNWCOE.Service.Controllers.Admin
{
    [Route("api/AddressType")]
    public class AddressTypeController : ControllerBase<AddressTypeController>
    {
        private readonly IAddressTypeRepository _repository;

        public AddressTypeController(IAddressTypeRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var data = _repository.GetAll();
            return Helper.CheckResult(data);
        }
        [HttpGet("{id}", Name = "GetAddressType")]
        public IActionResult Get(int id)
        {
            var data = _repository.Get(id);
            return Helper.CheckResult(data);
        }

        [HttpPost]
        public IActionResult Create([FromBody] AddressType newentry)
        {
            var result = _repository.Add(newentry);
            return CreatedAtRoute("GetAddressType", new { id = newentry.AddressTypeID }, newentry);
        }

        [HttpPut]
        public IActionResult Update([FromBody] AddressType editentry)
        {
            var result = _repository.Update(editentry, editentry.AddressTypeID);
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
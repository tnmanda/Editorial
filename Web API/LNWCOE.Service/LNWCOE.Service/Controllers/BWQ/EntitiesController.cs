using LNWCOE.Models.MMM;
using LNWCOE.Module.BWQ.Interface;
using LNWCOE.Service.BaseController;
using LNWCOE.Service.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace LNWCOE.Service.Controllers.BWQ
{
    [Route("api/Entities")]
    public class EntitiesController : ControllerBase<BwqController>
    {
        private readonly IEntitiesRepository _repository;
        private readonly IConfiguration _configuration;

        public EntitiesController(IEntitiesRepository repository, IConfiguration configuration)
        {
            _repository = repository;
            _configuration = configuration;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var data = _repository.Get(id);
            return Helper.CheckResult(data);
        }

        [HttpPost("name")]
        public IActionResult GetEntityByName([FromBody] MMMEntityName name)
        {
            var data = _repository.GetEntityByName(name);
            return Helper.CheckResult(data);

        }
        [HttpPost]
        public IActionResult GetMMMEntities([FromBody] EntityLookup lookup)
        {
            var result = _repository.GetMMMEntitiesAsync(lookup);
            return Helper.CheckResult(result);
        }


    }
}
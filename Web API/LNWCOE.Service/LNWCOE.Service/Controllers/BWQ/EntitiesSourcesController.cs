using LNWCOE.Module.BWQ.Interface;
using LNWCOE.Service.BaseController;
using LNWCOE.Service.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace LNWCOE.Service.Controllers.BWQ
{
    [Route("api/EntitiesSources")]
    public class EntitiesSourcesController : ControllerBase<EntitiesSourcesController>
    {
        private readonly IEntitiesSourcesRepository _repository;

        public EntitiesSourcesController(IEntitiesSourcesRepository repository)
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
    }
}
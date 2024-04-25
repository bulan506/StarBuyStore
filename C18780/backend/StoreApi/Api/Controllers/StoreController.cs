using MediatR;
using Microsoft.AspNetCore.Mvc;
using StoreApi.Models;
using StoreApi.Queries;

namespace StoreApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private readonly IMediator mediator;

        public StoreController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet]
        public async Task<Store> GetStoreAsync()
        {
            var product = await mediator.Send(new GetProductListQuery());
            var taxPercentage = 13;//nota: guardar el valor en db
            return new Store(product,taxPercentage);
        }
    }

}
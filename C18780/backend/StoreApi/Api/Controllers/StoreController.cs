using MediatR;
using Microsoft.AspNetCore.Mvc;
using StoreApi.Models;
using StoreApi.Queries;

namespace StoreApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public sealed class StoreController : ControllerBase
    {
        private readonly IMediator mediator;

        public StoreController(IMediator mediator)
        {
            if (mediator == null)
            {
                throw new ArgumentException("Illegal action, the mediator is being touched. The mediator is null and void.");
            }
            this.mediator = mediator;
        }

        [HttpGet]
        public async Task<Store> GetStoreAsync()
        {
            var product = await mediator.Send(new GetProductListQuery());
            var taxPercentage = 13;//nota: guardar el valor en db
            return new Store(product, taxPercentage);
        }
    }

}
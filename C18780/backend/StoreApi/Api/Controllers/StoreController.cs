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
        private readonly CategoryController categoryController;
        public StoreController(IMediator mediator, CategoryController categoryController)
        {
            if (mediator == null)
            {
                throw new ArgumentException("Illegal action, the mediator is being touched. The mediator is null and void.");
            }
            this.mediator = mediator;
            this.categoryController = categoryController;
        }

        [HttpGet("getStore")]
        public async Task<Store> GetStoreAsync(string category)
        {
            var taxPercentage = 13;
            if (category.Equals("All"))
            {
                var product = await mediator.Send(new GetProductListQuery());
                return new Store(product, taxPercentage);
            }
            else
            {
                var guidCategory = categoryController.GetCategoryByName(category);
                var product = await mediator.Send(new GetProductByCategoryQuery() { Category =  guidCategory.Uuid});
                return new Store(product, taxPercentage);
            }
        }
    }
}
using MediatR;
using Microsoft.AspNetCore.Mvc;
using StoreApi.Commands;
using StoreApi.Models;
using StoreApi.Queries;

namespace StoreApi
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IMediator mediator;

        public ProductController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet]
        public async Task<List<Product>> GetProductListAsync()
        {
            var product = await mediator.Send(new GetProductListQuery());

            return product;
        }

        [HttpGet("productId")]
        public async Task<Product> GetProductByIdAsync(Guid uuid)
        {
            var product = await mediator.Send(new GetProductByIdQuery() { Uuid = uuid });

            return product;
        }

        [HttpPost]
        public async Task<Product> AddProductAsync(Product products)
        {
            var product = await mediator.Send(new CreateProductCommand(
                products.Name,
                products.ImageUrl,
                products.Price,
                products.Description
                ));
            return product;
        }

        [HttpPut]
        public async Task<int> UpdateProductAsync(Product products)
        {
            var isProductUpdated = await mediator.Send(new UpdateProductCommand(
               products.Uuid,
               products.Name,
               products.ImageUrl,
               products.Price,
               products.Description));
            return isProductUpdated;
        }

        [HttpDelete]
        public async Task<int> DeleteProductAsync(Guid Uuid)
        {
            return await mediator.Send(new DeleteProductCommand() { Uuid = Uuid });
        }
    }
}
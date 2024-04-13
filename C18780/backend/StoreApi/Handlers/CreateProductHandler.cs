using MediatR;
using StoreApi.Commands;
using StoreApi.Models;
using StoreApi.Repositories;

namespace StoreApi.Handler
{
    public class CreateProductHandler: IRequestHandler<CreateProductCommand, Product>
    {
        private readonly IProductRepository _productRepository;

        public CreateProductHandler(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }
        public async Task<Product> Handle(CreateProductCommand command, CancellationToken cancellationToken)
        {
            var product = new Product()
            {
                Name = command.Name,
                Description = command.Description,
                Price = command.Price,
                ImageUrl = command.ImageUrl
            };

            return await _productRepository.AddProductAsync(product);
        }
    }
}
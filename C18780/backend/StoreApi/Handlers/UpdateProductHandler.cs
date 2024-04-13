using MediatR;
using StoreApi.Commands;
using StoreApi.Repositories;

namespace StoreApi.Handler
{
    public class UpdateProductHandler : IRequestHandler<UpdateProductCommand, int>
    {
        private readonly IProductRepository _productRepository;

        public UpdateProductHandler(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }
        public async Task<int> Handle(UpdateProductCommand command, CancellationToken cancellationToken)
        {
            var product = await _productRepository.GetProductByIdAsync(command.Uuid);
            if (product == null)
                return default;

            product.Name = command.Name;
            product.Description = command.Description;
            product.ImageUrl = command.ImageUrl;
            

            return await _productRepository.UpdateProductAsync(product);
        }
    }
}
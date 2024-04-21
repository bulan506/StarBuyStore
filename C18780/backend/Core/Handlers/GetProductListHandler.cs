using MediatR;
using StoreApi.Models;
using StoreApi.Queries;
using StoreApi.Repositories;

namespace StoreApi.Handler
{
    public class GetProductListHandler :  IRequestHandler<GetProductListQuery, List<Product>>
    {
        private readonly IProductRepository _productRepository;

        public GetProductListHandler(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<List<Product>> Handle(GetProductListQuery query, CancellationToken cancellationToken)
        {
            return await _productRepository.GetProductListAsync();
        }
    }
}

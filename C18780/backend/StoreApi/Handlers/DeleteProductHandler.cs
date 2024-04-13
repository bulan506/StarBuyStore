using MediatR;
using StoreApi.Commands;
using StoreApi.Repositories;

namespace StoreApi.Handler
{
    public class DeleteProductHandler : IRequestHandler<DeleteProductCommand, int>
    {
        private readonly IProductRepository _studentRepository;

        public DeleteProductHandler(IProductRepository studentRepository)
        {
            _studentRepository = studentRepository;
        }

        public async Task<int> Handle(DeleteProductCommand command, CancellationToken cancellationToken)
        {
            var product = await _studentRepository.GetProductByIdAsync(command.Uuid);
            if (product == null)
                return default;

            return await _studentRepository.DeleteProductAsync(product.Uuid);
        }
    }
}
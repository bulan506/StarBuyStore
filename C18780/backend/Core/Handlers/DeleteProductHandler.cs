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
            ValidateCommand(command);

            var product = await _studentRepository.GetProductByIdAsync(command.Uuid);
            if (product == null)
                return default;

            return await _studentRepository.DeleteProductAsync(product.Uuid);
        }

        private void ValidateCommand(DeleteProductCommand command)
        {
            if (command.Uuid == Guid.Empty)
            {
                throw new ArgumentException("The uuid cannot be empty.");
            }
        }
    }
}
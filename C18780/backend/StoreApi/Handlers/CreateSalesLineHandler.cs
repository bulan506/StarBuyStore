using MediatR;
using StoreApi.Commands;
using StoreApi.Models;
using StoreApi.Repositories;

namespace StoreApi.Handler
{
    public class CreateSalesLineHandler : IRequestHandler<CreateSalesLineCommand, SalesLine>
    {
        private readonly ISalesLineRepository _salesLineRepository;

        public CreateSalesLineHandler(ISalesLineRepository salesLineRepository)
        {
            _salesLineRepository = salesLineRepository;
        }

        public async Task<SalesLine> Handle(CreateSalesLineCommand command, CancellationToken cancellationToken)
        {
            ValidateCommand(command);

            var salesLine = new SalesLine()
            {
                Quantity = command.Quantity,
                Subtotal = command.Subtotal,
                UuidProduct = command.UuidProduct,
                UuidSales = command.UuidSales
            };

            return await _salesLineRepository.AddSalesLineAsync(salesLine);
        }

        private void ValidateCommand(CreateSalesLineCommand command)
        {
            if (command.Quantity <= 0)
            {
                throw new ArgumentException("The Date cannot be empty.");
            }
            if (command.Subtotal <= 0)
            {
                throw new ArgumentException("Confirmation error.");
            }
            if (command.UuidProduct != Guid.Empty)
            {
                throw new ArgumentException("The Paymet Methods cannot be empty.");
            }
            if (command.UuidSales != Guid.Empty)
            {
                throw new ArgumentException("The total must be greater than zero.");
            }
        }
    }
}
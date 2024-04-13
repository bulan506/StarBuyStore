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
            var salesLine = new SalesLine()
            {
                Quantity = command.Quantity,
                Subtotal = command.Subtotal,
                UuidProduct = command.UuidProduct,
                UuidSales = command.UuidSales
            };

            return await _salesLineRepository.AddSalesLineAsync(salesLine);
        }
    }
}
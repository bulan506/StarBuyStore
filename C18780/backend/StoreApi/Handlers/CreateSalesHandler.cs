using MediatR;
using StoreApi.Commands;
using StoreApi.Models;
using StoreApi.Repositories;

namespace StoreApi.Handler
{
    public class CreateSalesHandler : IRequestHandler<CreateSalesCommand, Sales>
    {
        private readonly ISalesRepository _salesRepository;

        public CreateSalesHandler(ISalesRepository salesRepository)
        {
            _salesRepository = salesRepository;
        }

        public async Task<Sales> Handle(CreateSalesCommand command, CancellationToken cancellationToken)
        {
            var sales = new Sales()
            {
                Date = command.Date,
                Confirmation = command.Confirmation,
                PaymentMethod = command.PaymentMethods,
                Total = command.Total,
                Address = command.Address
            };

            return await _salesRepository.AddSalesAsync(sales);
        }
    }
}
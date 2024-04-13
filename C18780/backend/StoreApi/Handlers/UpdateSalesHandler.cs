using MediatR;
using StoreApi.Commands;
using StoreApi.Repositories;

namespace StoreApi.Handler
{
    public class UpdateSalesHandler : IRequestHandler<UpdateSalesCommand, int>
    {
        private readonly ISalesRepository _salesRepository;

        public UpdateSalesHandler(ISalesRepository salesRepository)
        {
            _salesRepository = salesRepository;
        }
        public async Task<int> Handle(UpdateSalesCommand command, CancellationToken cancellationToken)
        {
            var sales = await _salesRepository.GetSalesByIdAsync(command.Uuid);
            if (sales == null)
                return default;

            sales.Date = command.Date;
            sales.Confirmation = command.Confirmation;
            sales.PaymentMethod = command.PaymentMethods;
            sales.Total = command.Total;
            sales.Address = command.Address;
            

            return await _salesRepository.UpdateSalesAsync(sales);
        }
    }
}
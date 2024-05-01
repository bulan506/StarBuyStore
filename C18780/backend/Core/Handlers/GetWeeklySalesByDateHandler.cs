using MediatR;
using StoreApi.Models;
using StoreApi.Queries;
using StoreApi.Repositories;

namespace StoreApi.Handler
{
    public sealed class GetWeeklySalesByDateHandler : IRequestHandler<GetWeeklySalesByDateQuery, List<WeeklySales>>
    {
        private readonly IWeeklySalesRepository _weeklySalesRepository;
        public GetWeeklySalesByDateHandler(IWeeklySalesRepository weeklySalesRepository)
        {
            _weeklySalesRepository = weeklySalesRepository;
        }
        public async Task<List<WeeklySales>> Handle(GetWeeklySalesByDateQuery query, CancellationToken cancellationToken)
        {
            ValidateQuery(query);
            return await _weeklySalesRepository.GetWeeklySalesByDateAsync(query.DateTime);
        }

        private void ValidateQuery(GetWeeklySalesByDateQuery query)
        {
            if (query.DateTime == DateTime.MinValue)
            {
                throw new ArgumentException("The Date cannot be empty.");
            }
        }
    }
}
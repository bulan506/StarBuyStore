using MediatR;
using StoreApi.Models;
using StoreApi.Queries;
using StoreApi.Repositories;

namespace StoreApi.Handler
{
    public class GetSalesByIdHandler :  IRequestHandler<GetSalesByIdQuery, Sales>
    {
        private readonly ISalesRepository _salesRepository;

        public GetSalesByIdHandler(ISalesRepository salesRepository)
        {
            _salesRepository = salesRepository;
        }

        public async Task<Sales> Handle(GetSalesByIdQuery query, CancellationToken cancellationToken)
        {
            return await _salesRepository.GetSalesByIdAsync(query.Uuid);
        }
    }
}

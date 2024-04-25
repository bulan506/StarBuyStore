using MediatR;
using StoreApi.Models;

namespace StoreApi.Queries
{
    public class GetDailySalesQuery : IRequest<List<DailySales>>
    {
        public DateTime DateTime { get; set; }
    }
}
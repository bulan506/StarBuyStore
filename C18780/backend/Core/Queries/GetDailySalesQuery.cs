using MediatR;
using StoreApi.Models;

namespace StoreApi.Queries
{
    public sealed class GetDailySalesQuery : IRequest<List<DailySales>>
    {
        public DateTime DateTime { get; set; }
    }
}
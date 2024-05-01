using MediatR;
using StoreApi.Models;

namespace StoreApi.Queries
{
    public sealed class GetWeeklySalesByDateQuery : IRequest<List<WeeklySales>>
    {
        public DateTime DateTime { get; set; }
    }
}
using MediatR;
using StoreApi.Models;

namespace StoreApi.Queries
{
    public class GetWeeklySalesByDateQuery : IRequest<List<WeeklySales>>
    {
        public DateTime DateTime { get; set; }
    }
}
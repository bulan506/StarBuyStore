using MediatR;
using StoreApi.Models;

namespace StoreApi.Queries
{
    public class GetSalesByIdQuery :  IRequest<Sales>
    {
        public Guid Uuid { get; set; }
    }
}
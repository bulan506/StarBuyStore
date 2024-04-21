using MediatR;
using StoreApi.Models;

namespace StoreApi.Queries
{
    public class GetProductByIdQuery :  IRequest<Product>
    {
        public Guid Uuid { get; set; }
    }
}
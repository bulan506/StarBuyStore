using MediatR;
using StoreApi.Models;

namespace StoreApi.Queries
{
    public class GetProductListQuery :  IRequest<List<Product>>
    {
    }
}